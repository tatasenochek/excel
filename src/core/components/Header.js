import { defaultTitle } from "../../const";
import { changeTitle } from "../../redux/actions";
import { ExcelComponent } from "../ExcelComponent";
import { ActiveRoute } from "../routes/ActiveRoute";
import { $ } from "./Utilit";

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listners: ['input', 'click'],
      ...options
    })
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle
    return `
    <input type="text" class="input" value="${title}">

        <div class="buttons">
          <button data-button="delete" class="button">
            <span class="material-symbols-outlined">
              delete
            </span>
          </button>
          <button data-button="exit" class="button">
            <span class="material-symbols-outlined">
              logout
            </span>
          </button>
        </div>
    `
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.button === 'delete') {
      const decision = confirm('Вы действительно хотите удалить таблицу?')
      if (decision) {
        localStorage.removeItem('excel:' + ActiveRoute.param)
        ActiveRoute.navigate('')
      }
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigate('')
    }
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(changeTitle($target.text()))
  }
}