import { ExcelComponent } from "../ExcelComponent";

export class Table extends ExcelComponent {
  static className = 'excel__table';
  toHTML() {
    return `
    <div class="table-row">
            <div class="tabel-column-empty"></div>
            <div class="tabel-column-count">A</div>
            <div class="tabel-column-count">B</div>
            <div class="tabel-column-count">C</div>
          </div>
          <div class="table-row-data">
            <div class="tabel-row-count">1</div>
            <div class="tabel-column" contenteditable spellcheck="true">Data 1A</div>
            <div class="tabel-column" contenteditable spellcheck="true">Data 1B</div>
            <div class="tabel-column" contenteditable spellcheck="true">Data 1C</div>
          </div>
          <div class="table-row-data">
            <div class="tabel-row-count">2</div>
            <div class="tabel-column" contenteditable spellcheck="true">Data 2A</div>
            <div class="tabel-column" contenteditable spellcheck="true">Data 2B</div>
            <div class="tabel-column" contenteditable spellcheck="true">Data 2C</div>
          </div>
          <div class="table-row-data">
            <div class="tabel-row-count">3</div>
            <div class="tabel-column" contenteditable spellcheck="true">Data</div>
            <div class="tabel-column" contenteditable spellcheck="true">Data</div>
            <div class="tabel-column" contenteditable spellcheck="true">Data</div>
          </div>
    `
  }
}