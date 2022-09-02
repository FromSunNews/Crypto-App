import * as tabActionTypes from './TabAction'

const initialState = {
    isTradeModalVisible: false
}

const TabReducer = (state = initialState, action) => {
    switch (action.type) {
        case tabActionTypes.SET_TRADE_MODAL_VISIBILITY:
            return {
                ...state,
                isTradeModalVisible: action.payload.isVisible
            }
        default:
            return state
    }
}

export default TabReducer