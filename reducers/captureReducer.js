import { GRANTING_CAMERA_PERMISSION } from '../types/ActionTypes'

const initialState = {
  hasCameraPermission: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GRANTING_CAMERA_PERMISSION:
      return { ...state, hasCameraPermission: action.cameraPermissionResult }
    default:
      return state
  }
}

export default reducer


