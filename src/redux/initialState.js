import { initialStates, defaultTitle } from "../const"
import { clone } from "../core/components/Table/utils"

const defaultState = {
  title: defaultTitle,
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: initialStates,
  date: new Date().toJSON()
}

const normalize = state => ({
  ...state,
  currentStyles: initialStates,
  currentText: ''
})

export function normalizeInitialState(state) {
  return state ? normalize(state) : clone(defaultState)
}