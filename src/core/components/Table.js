import { ExcelComponent } from "../ExcelComponent";
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

  onMousedown(event) {
    if (shouldResize(event)) {
      tableResizeHendler(event, this.$root)
    }
  }
}