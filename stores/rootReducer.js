import { combineReducers } from 'redux'

import TabReducer from './TabReducer'
import marketReducer from './markket/marketReducer'

export default combineReducers({
    TabReducer,
    marketReducer
})