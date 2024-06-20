import { storage } from "../core/components/utils"

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  currentText: ''
}

export const initialState = storage('excel-state') ? storage('excel-state') : defaultState