import * as action from '../../../redux/actions';
import { ExcelComponent } from '../../ExcelComponent';
import { TableSelection } from './TabelSelection';
import { $ } from '../Utilit';
import { createTable, isCell, matrix, nextSelector, shouldResize, tableResizeHendler } from './utils';
import { initialStates } from '../../../const';
import { parse } from '../../parse';

export class Table extends ExcelComponent {
	static className = 'excel__table';

	constructor($root, options) {
		super($root, {
			name: 'Table',
			listners: ['mousedown', 'keydown', 'input'],
			...options,
		});
	}

	toHTML() {
		return createTable(10, this.store.getState());
	}

	prepare() {
		this.selection = new TableSelection();
	}

	init() {
		super.init();

		this.selectCell(this.$root.find('[data-id="0:0"]'));

		this.$on('formula:input', value => {
			this.selection.current
				.attr('data-value', value)
				.text(parse(value))
			this.updateTextInStore(value);
		});

		this.$on('formula:done', () => {
			this.selection.current.focus();
		});

		this.$on('toolbar:applyStyle', value => {
			this.selection.applyStyle(value)
			this.$dispatch(action.applyStyle({
				value,
				ids: this.selection.selectCellIds
			}))
		})
	}

	selectCell($cell) {
		this.selection.select($cell);
		this.$emit('table:select', $cell);
		const styles = $cell.getStyles(Object.keys(initialStates))
		this.$dispatch(action.changeStyle(styles))
	}

	async resizeTable(event) {
		try {
			const data = await tableResizeHendler(event, this.$root);
			this.$dispatch(action.tableResize(data));
		} catch (e) {
			console.warn('Resize error', e.message);
		}
	}

	onMousedown(event) {
		if (shouldResize(event)) {
			this.resizeTable(event);
		} else if (isCell(event)) {
			const $target = $(event.target);
			if (event.shiftKey) {
				const $cells = matrix($target, this.selection.current).map((id) =>
					this.$root.find(`[data-id="${id}"]`)
				);
				this.selection.selectGroup($cells);
			} else {
				this.selectCell($target);
			}
		}
	}

	onKeydown(event) {
		const keys = [
			'Tab',
			'Enter',
			'ArrowLeft',
			'ArrowUp',
			'ArrowRight',
			'ArrowDown',
		];
		const { key } = event;
		if (keys.includes(key) && !event.shiftKey) {
			event.preventDefault();

			const id = this.selection.current.id(true);
			const $next = this.$root.find(nextSelector(key, id));
			this.selectCell($next);
		}
	}

	updateTextInStore(value) {
		this.$dispatch(
			action.changeText({
				id: this.selection.current.id(),
				value,
			})
		);
	}

	onInput(event) {
		// this.$emit('table:input', $(event.target))
		this.updateTextInStore($(event.target).text());
	}
}
