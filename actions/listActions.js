import { STRINGITEM_SELECTED } from '../types/ActionTypes'

export const selectStringItemToGiveFeedback = (uiStringItem) => ({
  type: STRINGITEM_SELECTED,
  uiStringItem
})