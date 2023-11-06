import express from 'express'
import fs from 'fs'
//today all in one file but it's not that big

const port = process.env.PORT || 3000
const app = express()

app.set('trust proxy', true)
app.use(express.json())

const RANGE_START_INDEX_IN_CSV = 0
const RANGE_END_INDEX_IN_CSV = 1
const COUNTRY_INDEX_IN_CSV = 3

const path = './table.csv'

const convertIPToNumeric = (ip: string) => {
  return ip.split('.').reduce((acc, octet, index) => {
    return acc + (parseInt(octet) << (8 * (3 - index)))
  }, 0)
}

const convertIPToDottedDecimal = (ip: number) => {
  const octets = [];

  for (let i = 3; i >= 0; i--) {
    octets.push((ip >> (i * 8)) & 255);
  }

  return octets.join('.');
};

const getTableFromCSV = () => {
  try {
    const table = fs.readFileSync(path, 'utf8')

    return {
      sucsess: true, 
      result: table.split('\n')
        .map(row => row.split(',')
        .map( item => item.slice(1, -2)))} // remove quotes
  }
  catch (error: any) {
    return { sucsess: false, result: error.message }
  }
}

// returns index of values between which we caan find ip or -1 if not found
const searchBetweenBinary = (table: number[][], ip: number) => {
  let start = 0
  let end = table.length - 1

  while (start <= end) {
    const middle = Math.floor((start + end) / 2)

    const [ startRange, endRange ] = table[middle]
    
    if (startRange <= ip && endRange >= ip) {
      return middle
    }
    else if (startRange < ip) {
      start = middle + 1
    }
    else {
      end = middle - 1
    }
  }

  return -1
}  

const getIp = (req: express.Request) => {
  try {
    const ip = req.ip
    return { sucsess: true, result: ip }
  }
  catch (error: any) {
    return { sucsess: false, result: error.message }
  }
}

const getCountryByIP = (ip: string) => {
  const data = getTableFromCSV()
  if (!data.sucsess) return data

  const ranges = data.result
    .map((item: string[]) => item.slice(0, 2).map(value => Number(value)))

  const index = searchBetweenBinary(ranges, convertIPToNumeric(ip))

  if (index === -1) return { sucsess: false, result: `Not found. given ip: ${ip}` }

  return {
    sucsess: true,
    rangeFrom: convertIPToDottedDecimal(data.result[index][RANGE_START_INDEX_IN_CSV]),
    rangeTo: convertIPToDottedDecimal(data.result[index][RANGE_END_INDEX_IN_CSV]),
    country: data.result[index][COUNTRY_INDEX_IN_CSV],
    ip,
  }
}

app.get('/', (req: express.Request, res: express.Response) => {
  try {
    const { sucsess, result } = getIp(req)
    if (!sucsess) return result.status(500).json({ sucsess: false, result: 'Problem with getting ip:' + result })
    res.json(getCountryByIP(result))
  }
  catch (error: any) {
    res.status(500).json({ sucsess: false, result: error.message })
  }  
})

app.listen(port, () => console.log(`Server running on port ${port}`))

process.on('SIGINT', () => process.exit(0))