import { Events } from "./Events";

export class ExcelComponent extends Events {
  constructor($root, options = {}) {
    super($root, options.listners)

    this.name = options.name || ''
    this.emitter = options.emitter
    this.unsubscribers = []
    
    this.prepare()
  }

  prepare() {}

  toHTML() {
    return ''
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  init() {
    this.addEventListener()
  }

  destroy() {
    this.removeEventListener()
    this.unsubscribers.forEach(unsub => unsub())
  }
}