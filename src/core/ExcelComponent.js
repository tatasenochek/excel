import { Events } from "./Events";

export class ExcelComponent extends Events {
  constructor($root, options = {}) {
    super($root, options.listners)

    this.name = options.name
  }

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