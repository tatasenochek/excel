import { initialStates } from "../const"
import { storage } from "../core/components/Table/utils"

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  currentText: '',
  currentStyles: initialStates
}

export const initialState = storage('excel-state') ? storage('excel-state') : defaultState