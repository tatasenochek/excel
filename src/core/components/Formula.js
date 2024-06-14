import { ExcelComponent } from "../ExcelComponent";

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root) {
    super($root, {
      name: 'Formula',
      listners: ['input', 'click'],
    })
  }

  toHTML() {
    return `
        <p class="info">fx</p>
        <input class="input" contenteditable spellcheck="false"></input>
    `
  }

  onInput(event) {
    console.log(this.$root)
    console.log('Formula: onInput', event.target.value.trim())
  }

  onClick() {
    console.log('message')
  }
}