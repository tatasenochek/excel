import { $ } from "../Utilit";
import { createCell, createColumn, createRow } from "./template";

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

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 26;

function toChar(_, index) {
	return String.fromCharCode(CODES.A + index);
}

export function getWidth(state, index) {
	return (state[index] || DEFAULT_WIDTH) + 'px';
}

export function getHeight(state, index) {
	return (state[index] || DEFAULT_HEIGHT) + 'px';
}

function withWidthFrom(state) {
	return function (col, index) {
		return {
			col,
			index,
			width: getWidth(state.colState, index),
		};
	};
}

export function createTable(rowsCount = 10, state = {}) {
	const colsCount = CODES.Z - CODES.A + 1;
	const rows = [];

	const cols = new Array(colsCount)
		.fill('')
		.map(toChar)
		.map(withWidthFrom(state))
		.map(createColumn)
		.join('');

	rows.push(createRow(null, cols, {}));

	for (let row = 0; row < rowsCount; row++) {
		const cells = new Array(colsCount)
			.fill('')
			.map(createCell(state, row))
			.join('');
		rows.push(createRow(row + 1, cells, state.rowState));
	}

	return rows.join('');
}

export function shouldResize(event) {
	return event.target.dataset.resize;
}

export function tableResizeHendler(event, $root) {
	return new Promise((resolve) => {
		const $resizer = $(event.target);
		const $parent = $resizer.closest('[data-type="resizable"]');
		const coords = $parent.getCoords();
		const cells = $root.findAll(`[data-col="${$parent.data.col}"]`);
		const typeResize = $resizer.data.resize;
		const sideProp = typeResize === 'col' ? 'bottom' : 'right';
		let value;

		$resizer.css({
			opacity: 1,
			[sideProp]: '-5000px',
		});

		document.onmousemove = (e) => {
			if (typeResize === 'col') {
				const delta = Math.floor(e.pageX - coords.right);
				value = Math.floor(coords.width + delta);
				$resizer.css({
					right: -delta + 'px',
				});
			} else {
				const delta = Math.floor(e.pageY - coords.bottom);
				value = Math.floor(coords.height + delta);
				$resizer.css({
					bottom: -delta + 'px',
				});
			}
		};

		document.onmouseup = () => {
			document.onmousemove = null;
			document.onmouseup = null;

			$resizer.css({
				opacity: 0,
				bottom: 0,
				right: 0,
			});

			if (typeResize === 'col') {
				$parent.css({ width: value + 'px' });
				cells.forEach((el) => (el.style.width = value + 'px'));
			} else {
				$parent.css({ height: value + 'px' });
			}

			resolve({
				value,
				typeResize,
				id: typeResize === 'col' ? $parent.data.col : $parent.data.row,
			});
		};
	});
}

export function isCell(event) {
	return event.target.dataset.type === 'cell';
}

export function range(start, end) {
	if (start > end) {
		[end, start] = [start, end];
	}
	return new Array(end - start + 1).fill('').map((_, index) => start + index);
}

export function matrix($target, $current) {
	const target = $target.id(true);
	const current = $current.id(true);
	const cols = range(current.col, target.col);
	const rows = range(current.row, target.row);

	return cols.reduce((acc, col) => {
		rows.forEach((row) => acc.push(`${row}:${col}`));
		return acc;
	}, []);
}

export function nextSelector(key, { row, col }) {
	const minValue = 0;
	switch (key) {
		case 'Enter':
		case 'ArrowDown':
			row++;
			break;
		case 'Tab':
		case 'ArrowRight':
			col++;
			break;
		case 'ArrowLeft':
			col = col - 1 < minValue ? minValue : col - 1;
			break;
		case 'ArrowUp':
			row = row - 1 < minValue ? minValue : row - 1;
			break;
	}
	return `[data-id="${row}:${col}"]`;
}

export function storage(key, data = null) {
	if (!data) {
		return JSON.parse(localStorage.getItem(key));
	}
	localStorage.setItem(key, JSON.stringify(data));
}

export function isEqual(a, b) {
	if (typeof a === 'object' && typeof b === 'object') {
		return JSON.stringify(a) === JSON.stringify(b);
	}
	return a === b;
}

export function debounce(fn, wait) {
	let timeout
	return function(...args) {
		const later = () => {
			clearTimeout(timeout)
			fn(...args)
		}
		clearTimeout(timeout)
		timeout = setTimeout(later, wait)
	}
}

export function clone(obj) {
  return JSON.parse(JSON.stringify(obj))
}