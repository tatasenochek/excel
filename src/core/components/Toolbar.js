import { ExcelComponent } from "../ExcelComponent";
import { createToolbar } from "./template";

export class Toolbar extends ExcelComponent {
  static className = 'excel__toolbar';

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      ...options
    })
  }

  toHTML() {
    return createToolbar()
  }
}
