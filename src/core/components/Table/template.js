import { initialStates } from "../../../const";
import { parse } from "../../parse";
import { getHeight, getWidth } from "./utils";

export function createCell(state, row) {
	return function (_, col) {
		const width = getWidth(state.colState, col);
		const id = `${row}:${col}`;
		const data = state.dataState[id];
		const styles = toInlineStyle({
			...initialStates,
			...state.stylesState[id]
		})
	
		return `
			<div 
				class="cell" 
				contenteditable 
				data-type="cell" 
				data-col=${col} 
				data-row=${row}
				data-id=${row}:${col}
				data-value="${data || ''}"
				style="${styles}; width:${width}"
			>${parse(data) || ''}</div>
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

export function camelToDashCase(str) {
	return str.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)
}

export function toInlineStyle(styles = {}) {
	return Object.keys(styles)
		.map(key => `${camelToDashCase(key)}:${styles[key]}`)
		.join('; ')
}