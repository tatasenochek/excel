import { initialStates, defaultTitle } from "../const"

const defaultState = {
  title: defaultTitle,
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: initialStates
}

const normalize = state => ({
  ...state,
  currentStyles: initialStates,
  currentText: ''
})

export function normalizeInitialState(state) {
  return state ? normalize(state) : defaultState
}