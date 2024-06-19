import { Events } from "./Events";

export class ExcelComponent extends Events {
  constructor($root, options = {}) {
    super($root, options.listners)

    this.name = options.name || ''

    this.prepare()
  }

  prepare() {}

  toHTML() {
    return ''
  }

  init() {
    this.addEventListener()
  }

  destroy() {
    this.removeEventListener()
  }
}