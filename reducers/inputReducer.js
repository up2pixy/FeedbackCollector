import { STRINGITEM_SELECTED, TRANSLATION_UPDATED } from '../types/ActionTypes'

const initialState = {
  uiStringItem: null,
  newTranslation: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STRINGITEM_SELECTED:
      return { 
        ...state,
        uiStringItem: action.uiStringItem, 
        newTranslation: action.uiStringItem.TargetString
      }
    case TRANSLATION_UPDATED:
      return {
        ...state,
        newTranslation: action.newTranslation
      }
    default:
      return state
  }
}

export default reducer
