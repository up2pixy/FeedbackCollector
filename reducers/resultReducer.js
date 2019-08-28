import { SENDING_FEEDBACK, SUBMIT_FEEDBACK_SUCCESS, SUBMIT_FEEDBACK_FAILURE, EMAIL_UPDATED, EMAIL_SENT } from '../types/ActionTypes'

const initialState = {
  isSending: true,
  submitSucceed: false,
  email: null,
  emailSent: false,
  feedbackId: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SENDING_FEEDBACK:
      return { ...state, isSending: true }
    case SUBMIT_FEEDBACK_SUCCESS:
      return {
        ...state,
        isSending: false,
        submitSucceed: true,
        emailSent: false,
        feedbackId: action.feedbackId
      }
    case SUBMIT_FEEDBACK_FAILURE:
      return {
        ...state,
        isSending: false,
        submitSucceed: false,
        emailSent: false
      }
    case EMAIL_UPDATED:
      return {
        ...state,
        email: action.email
      }
    case EMAIL_SENT:
      return {
        ...state,
        emailSent: true
      }
    default:
      return state
  }
}

export default reducer