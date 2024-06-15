import { ExcelComponent } from "../ExcelComponent";

export class Toolbar extends ExcelComponent {
  static className = 'excel__toolbar';
  toHTML() {
    return `
    <button type="button" class="button">
          <span class="material-symbols-outlined">
            format_bold
          </span>
        </button>
        <button type="button" class="button">
          <span class="material-symbols-outlined">
            format_italic
          </span>
        </button>
        <button type="button" class="button">
          <span class="material-symbols-outlined">
            strikethrough_s
          </span>
        </button>
        <button type="button" class="button">
          <span class="material-symbols-outlined">
            format_align_left
          </span>
        </button>
        <button type="button" class="button">
          <span class="material-symbols-outlined">
            format_align_justify
          </span>
        </button>
        <button type="button" class="button">
          <span class="material-symbols-outlined">
            format_align_right
          </span>
        </button>
    `
  }
}