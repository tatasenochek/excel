import { initialStates } from "../../../const";
import { ExcelStateComponent } from "../../ExcelStateComponent";
import { $ } from "../Utilit";
import { createToolbar } from "./template";


export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar';

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listners: ['click'],
      subscribe: ['currentStyles'],
      ...options
    })
  }
  prepare() {
    this.initState(initialStates)
  }

  get template() {
    return createToolbar(this.state)
  }

  toHTML() {
    return this.template
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.type === 'button') {
      
      const value = JSON.parse($target.data.value)
      this.$emit('toolbar:applyStyle', value)
    }
  }

  storeChanged(changes) {
    this.setState(changes.currentStyles)
  }
}
