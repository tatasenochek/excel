import { TABLE_RESIZE } from "./types"

export function rootReduser(state, action) {
  let prevState
  let field
  console.log(action)
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.typeResize === 'col' ? 'colState' : 'rowState'
      prevState = state[field] || {}
      prevState[action.data.id] = action.data.value
      return {...state, [field]: prevState}
    default: return state
  }
}