export class Emitter {
  constructor() {
    this.listners = {}
  }

  emit(event, ...args) {
    if (!Array.isArray(this.listners[event])) {
      return false
    }
    this.listners[event].forEach(listner => {
      listner(...args)
    })
    return true
  }

  subscribe(event, fn) {
    this.listners[event] = this.listners[event] || []
    this.listners[event].push(fn)
    return () => {
      this.listners[event] = 
        this.listners[event].filter(listner => listner !== fn)
    }
  }
}
