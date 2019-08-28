import React from 'react'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import RootContainer from './containers/RootContainer'
import rootReducer from './reducers'

const loggerMiddleware = createLogger()
const store = createStore(
  rootReducer, 
  applyMiddleware(
    thunkMiddleware, 
    loggerMiddleware 
  )
)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}