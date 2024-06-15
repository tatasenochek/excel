import { ExcelComponent } from "../ExcelComponent";
import { createTable } from "./utils";

export class Table extends ExcelComponent {
  static className = 'excel__table';
  toHTML() {
    return createTable(20)
  }
}