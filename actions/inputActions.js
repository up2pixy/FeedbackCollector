import { TRANSLATION_UPDATED, SENDING_FEEDBACK, SUBMIT_FEEDBACK_SUCCESS, SUBMIT_FEEDBACK_FAILURE } from '../types/ActionTypes'

export const setNewTranslation = text => ({
  type: TRANSLATION_UPDATED,
  newTranslation: text
})

export const handleSendButton = (uiStringItem, newTranslation) => {
  return async dispatch => {
    dispatch(sendingFeedback())
    let result = await submitFeedback(uiStringItem, newTranslation)
    if (result.success) {
      dispatch(submitSucceed(result.feedbackId))
    } else {
      dispatch(submitFailed())
    }
  }
}

const sendingFeedback = () => ({
  type: SENDING_FEEDBACK
})

const submitSucceed = (feedbackId) => ({
  type: SUBMIT_FEEDBACK_SUCCESS,
  feedbackId
})

const submitFailed = () => ({
  type: SUBMIT_FEEDBACK_FAILURE
})

const submitFeedback = async (uiStringItem, newTranslation) => {
  
  let response = await fetch('https://fhl-feedbackcollectorservice.azurewebsites.net/api/Feedback', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      NewTranslation: newTranslation,
      ResourceItems: uiStringItem.ResourceItems
    }),
  })
  let result = await response.json()
  return { success: response.ok, feedbackId: response.ok ? result.FeedbackId : null}
}
