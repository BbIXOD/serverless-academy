import fs from 'fs/promises'

export default class JSONBaseController {
  private _path: string

  public constructor (path: string) {
    this._path = path
  }

  public async set (key: string, value: string, overwrite = false) {
    try {
      const data = await this._getJSON()

      if (!overwrite && data[key]) {
        return { success: false, data: 'Key already exists' }
      }
      data[key] = value

      await fs.writeFile(this._path, JSON.stringify(data))

      return { success: true }
    }
    catch (err: any) {
      return { success: false, data: err.message }
    }
  }

  public async get (key: string) {
    try {
      const data = await this._getJSON()
      return { success: true, data: data[key] }
    }
    catch (err: any) {
      return { success: false, data: err.message }
    }
  }

  private async _getJSON () {
    const data = await fs.readFile(this._path, 'utf-8')
    return JSON.parse(data)
  }
}