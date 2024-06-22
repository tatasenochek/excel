import { CHANGE_TITLE, CHANGE_TEXT, CHANGE_STYLE, TABLE_RESIZE, APPLY_STYLE, UPDATE_DATE } from "./types";

export function tableResize(data) {
 return {
  type: TABLE_RESIZE,
  data
 }
}

export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    data
  }
}

export function changeStyle(data) {
  return {
    type: CHANGE_STYLE,
    data
  }
}

export function applyStyle(data) {
  return {
    type: APPLY_STYLE,
    data
  }
}

export function changeTitle(data) {
  return {
    type: CHANGE_TITLE,
    data
  }
}

export function updateDate() {
  return {
    type: UPDATE_DATE
  }
}