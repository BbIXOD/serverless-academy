export default class Timer {
  _playTime //time from pause
  _prevTime // elapsed time
  _working // is timer was stopped
  _paused


  static WORK_ERROR = 'Timer was stopped'

  constructor() {
    this._playTime = 0
    this._prevTime = 0
    this._working = false
    this._paused = false
  }

  start() { 
    this._working = true
    this.resume()
    this._prevTime = 0
  }

  resume() {
    if (!this._working) throw new Error(Timer.WORK_ERROR)
    this._playTime = Date.now()
    this._paused = false
  }

  pause() {
    if (!this._working) throw new Error(Timer.WORK_ERROR)
    this._paused = true
    this._prevTime = this.getTime()
    return this._prevTime
  }

  getTime() {
    return Date.now() - this._playTime - this._prevTime //work time in ms
  }

  stop() {
    if (!this._working) throw new Error(Timer.WORK_ERROR)
    this._working = false
  }
}  