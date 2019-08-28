import { SENDING_PHOTO_FOR_STRINGLIST, RECEIVE_STRINGLIST } from '../types/ActionTypes'

const initialState = {
  isSendingPictures: true,
  uiStringItemList: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SENDING_PHOTO_FOR_STRINGLIST:
      return { ...state, isSendingPictures: true }
    case RECEIVE_STRINGLIST:
      return {
        ...state,
        isSendingPictures: false,
        uiStringItemList: action.uiStringItemList
      }
    default:
      return state
  }
}

export default reducer


