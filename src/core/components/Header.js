import { ExcelComponent } from "../ExcelComponent";

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      ...options
    })
  }

  toHTML() {
    return `
    <input type="text" class="input" value="Новая таблица">

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
}