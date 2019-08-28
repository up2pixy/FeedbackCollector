import { combineReducers } from 'redux'
import appReducer from './appReducer'
import captureReducer from './captureReducer'
import listReducer from './listReducer'
import inputReducer from './inputReducer'
import resultReducer from './resultReducer'

export default combineReducers({
    app: appReducer,
    capture: captureReducer,
    list: listReducer,
    input: inputReducer,
    result: resultReducer
})