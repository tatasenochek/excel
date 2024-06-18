import { $ } from "./utilit";

export function capitalize(string) {
	if (typeof string !== 'string') {
		return '';
	}
	return 'on' + string.charAt(0).toUpperCase() + string.slice(1);
}
const CODES = {
	A: 65,
	Z: 90,
};

function createCell(row) {
	return function(_, col) {
		return `
			<div 
				class="cell" 
				contenteditable 
				data-type="resizable" 
				data-col=${col} 
				data-row=${row}
				data-id=${row}:${col} 
			></div>
		`
	}
}

function createRow(index, content) {
	const resize = index ? `<div class="row-resize" data-resize="row"></div>` : ''
	return `
   <div class="row" data-type="resizable" data-row="${index}">
      <div class="row-info">
				${index ? index : ''}
				${resize}
				</div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

function createColumn(col, index) {
	return `
		<div class="column" data-type="resizable" data-col="${index}">
			${col}
			<div class="col-resize" data-resize="col"></div>
		</div>
	`;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 10) {
	const colsCount = CODES.Z - CODES.A + 1;
	const rows = [];

  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(createColumn)
    .join('')
   
	rows.push(createRow(null, cols));

	for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill('')
      .map(createCell(row))
      .join('')
	  rows.push(createRow(row+1, cells))
	}

	return rows.join('');
}

export function shouldResize(event) {
	return event.target.dataset.resize
}

export function tableResizeHendler(event, $root) {
	const $resizer = $(event.target)
	const $parent = $resizer.closest('[data-type="resizable"]')
	const coords = $parent.getCoords()
	const cells = $root.findAll(`[data-col="${$parent.data.col}"]`)
	const typeResize = $resizer.data.resize
	const sideProp = typeResize === 'col' ? 'bottom' : 'right'
	let value;

	$resizer.css({
		opacity: 1,
		[sideProp]: '-5000px'
	})

	document.onmousemove = e => {
		if (typeResize === 'col') {
			const delta = Math.floor(e.pageX - coords.right)
			value = Math.floor(coords.width + delta)
			$resizer.css({
				right: -delta + 'px'
			})
		} else {
			const delta = Math.floor(e.pageY - coords.bottom)
			value = Math.floor(coords.height + delta)
			$resizer.css({
				bottom: -delta + 'px'
			})
		}       
	}

	document.onmouseup = () => {
		document.onmousemove = null
		document.onmouseup = null

		$resizer.css({
			opacity: 0,
			bottom: 0,
			right: 0
		})

		if (typeResize === 'col') {
			$parent.css({width: value + 'px'})
			cells.forEach(el => el.style.width = value + 'px')
		} else {
			$parent.css({height: value + 'px'})
		}
	}
}