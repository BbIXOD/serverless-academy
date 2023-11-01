import { getJSON } from './reader.js'

const path = 'data.json'

const data = await getJSON(path)
const usersMap = {}

// transform and add new item to userMap
const createRecord = (item) => {
  const record =
    {
      userId: item.user._id,
      userName: item.user.name,
      vacations: []
    }
  usersMap[record.userId] = record

  return record
}

for (const item of data) {
  const record = usersMap[item.user._id] || createRecord(item)

  record.vacations
    .push({ startdate: item.startDate, endDate: item.endDate })
}

const result = JSON.stringify(Object.values(usersMap), null, 2)

console.log(result)
