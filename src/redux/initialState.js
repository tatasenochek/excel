import { initialStates, defaultTitle } from "../const"
import { storage } from "../core/components/Table/utils"

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

export const initialState = storage('excel-state') ? normalize(storage('excel-state')) : defaultState
