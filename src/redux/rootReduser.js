import { CHANGE_TEXT, TABLE_RESIZE, CHANGE_STYLE } from './types';

export function rootReduser(state, action) {
	let field;

	switch (action.type) {
		case TABLE_RESIZE:
			field = action.data.typeResize === 'col' ? 'colState' : 'rowState';
			return {
				...state,
				[field]: value(state, field, action),
			};
		case CHANGE_TEXT:
			field = 'dataState';
			return {
				...state,
				currentText: action.data.value,
				dataState: value(state, field, action),
			};
    case CHANGE_STYLE:
      return {
        ...state,
        currentStyles: action.data
      }
    // case APPLY_STYLE:
		default:
			return state;
	}
}

function value(state, field, action) {
	const val = state[field] || {};
	val[action.data.id] = action.data.value;
	return val;
}
