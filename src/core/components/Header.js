import { defaultTitle } from "../../const";
import { changeTitle } from "../../redux/actions";
import { ExcelComponent } from "../ExcelComponent";
import { $ } from "./Utilit";

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listners: ['input'],
      ...options
    })
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle
    return `
    <input type="text" class="input" value="${title}">

        <div class="buttons">
          <button type="button" class="button">
            <span class="material-symbols-outlined">
              delete
            </span>
          </button>
          <button type="button" class="button">
            <span class="material-symbols-outlined">
              logout
            </span>
          </button>
        </div>
    `
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(changeTitle($target.text()))
  }
}