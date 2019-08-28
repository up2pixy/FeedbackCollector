import { EMAIL_UPDATED, EMAIL_SENT } from '../types/ActionTypes'

export const setEmail = text => ({
  type: EMAIL_UPDATED,
  email: text
})

export const sendEmail = (feedbackId, emailAddress) => {
  return async dispatch => {
    await sendEmailAddress(feedbackId, emailAddress)
    dispatch({type: EMAIL_SENT})
  }
}

const sendEmailAddress = async (feedbackId, emailAddress) => {
  await fetch('https://fhl-feedbackcollectorservice.azurewebsites.net/api/Feedback/LinkEmail', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      FeedbackId: feedbackId,
      Email: emailAddress
    }),
  })
}