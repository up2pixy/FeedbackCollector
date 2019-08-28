import { GRANTING_CAMERA_PERMISSION, SENDING_PHOTO_FOR_STRINGLIST, RECEIVE_STRINGLIST } from '../types/ActionTypes'
import { ImageManipulator } from 'expo'

export const handleCameraPermissionGranting = cameraPermissionResult => ({
  type: GRANTING_CAMERA_PERMISSION,
  cameraPermissionResult
})

export function cropPhotoAndQueryServerForUiStringItemList(photo, cameraLayout, frameLayout) {
  return async dispatch => {
    dispatch(sendingPicture())
    let croppedPhoto = await cropAndResizePhoto(photo, cameraLayout, frameLayout)
    let uiStringItemList = await getUiStringItemList(croppedPhoto)
    dispatch(receiveUiStringItemList(uiStringItemList))
  }
}

export function queryServerForUiStringItemList(photo) {
  return async dispatch => {
    dispatch(sendingPicture())
    let resizedPhoto = await resizePhoto(photo)
    let uiStringItemList = await getUiStringItemList(resizedPhoto)
    dispatch(receiveUiStringItemList(uiStringItemList))
  }
}


const sendingPicture = () => ({
  type: SENDING_PHOTO_FOR_STRINGLIST
})

const receiveUiStringItemList = (uiStringItemList) => ({
  type: RECEIVE_STRINGLIST,
  uiStringItemList,
})

async function resizePhoto(photo) {
  let resizeData
  if (photo.width > photo.height ) {
    resizeData = { height: 1500 }
  } else {
    resizeData = { width: 1500 }
  }
  return await ImageManipulator.manipulateAsync(photo.uri, [{resize: resizeData}], { format: 'jpeg', compress: 0.8, base64: true })
}

async function cropAndResizePhoto(photo, cameraLayout, frameLayout) {

  const ratio = photo.width / cameraLayout.width
  const cropData = {
    originX: (frameLayout.x + 19)  * ratio,
    originY: (frameLayout.y + 19) * ratio,
    width: (frameLayout.width - 38) * ratio,
    height: (frameLayout.height - 38) * ratio,
  }

  return await ImageManipulator.manipulateAsync(photo.uri, [{crop: cropData}, {resize: {width:1500}}], { format: 'jpeg', compress: 0.8, base64: true })
}

async function getUiStringItemList(croppedPhoto) {

  let response = await fetch('https://fhl-feedbackcollectorservice.azurewebsites.net/api/Recognition', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ImageBase64: croppedPhoto.base64
    }),
  })

  let responseJson = await response.json()

  return responseJson
}
