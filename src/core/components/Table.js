import { ExcelComponent } from "../ExcelComponent";
import { TableSelection } from "./TabelSelection";
import { createTable, shouldResize, tableResizeHendler } from "./utils";

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listners: ['mousedown']
    })
  }

  toHTML() {
    return createTable(100)
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()

    const $cell = this.$root.find('[data-id="0:0"]')
    this.selection.select($cell)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      tableResizeHendler(event, this.$root)
    }
  }
}