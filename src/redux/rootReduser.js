import { CHANGE_TEXT, TABLE_RESIZE, CHANGE_STYLE, APPLY_STYLE, CHANGE_TITLE, UPDATE_DATE } from './types';

export function rootReduser(state, action) {
	let field;
	let val

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
    case APPLY_STYLE:
			field = 'stylesState'
			val = state[field] || {}
			action.data.ids.forEach(id => {
				val[id] = {...val[id], ...action.data.value}
			})
			return {
				...state,
				[field]: val, 
				currentStyles: {...state.currentStyles, ...action.data.value}
			}
		case CHANGE_TITLE:
			return {...state, title: action.data}
		case UPDATE_DATE:
			return {...state, date: new Date().toJSON()}
			default:
			return state;
	}
}

function value(state, field, action) {
	const val = state[field] || {};
	val[action.data.id] = action.data.value;
	return val;
}
