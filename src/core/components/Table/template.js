import { initialStates } from "../../../const";
import { camelToDashCase, getHeight, getWidth } from "./utils";

export function createCell(state, row) {
	return function (_, col) {
		const width = getWidth(state.colState, col);
		const id = `${row}:${col}`;
		const data = state.dataState[id];
		const styles = Object.keys(initialStates)
		.map(key => `${camelToDashCase(key)}:${initialStates[key]}`)
		.join('; ')
	
		return `
			<div 
				class="cell" 
				contenteditable 
				data-type="cell" 
				data-col=${col} 
				data-row=${row}
				data-id=${row}:${col}
				style="${styles}; width:${width}"
			>${data || ''}</div>
		`;
	};
}

export function createRow(index, content, state) {
	const resize = index
		? `<div class="row-resize" data-resize="row"></div>`
		: '';
	const height = getHeight(state, index);
	return `
   <div 
	 	class="row" 
	 	data-type="resizable" 
		data-row="${index}"
		style="height: ${height}"
		>
      <div class="row-info">
				${index ? index : ''}
				${resize}
				</div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

export function createColumn({ col, index, width }) {
	return `
		<div 
			class="column" 
			data-type="resizable" 
			data-col="${index}" 
			style="width: ${width}"
		> 
			${col}
			<div class="col-resize" data-resize="col"></div>
		</div>
	`;
}

export function createToolbar() {
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
    `;
}
