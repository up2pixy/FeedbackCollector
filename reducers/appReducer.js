import { LOADING_COMPLETE } from '../types/ActionTypes'

const initialState = {
    isLoadingComplete: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_COMPLETE:
            return { ...state, isLoadingComplete: true }
        default:
            return state
    }
}

export default reducer