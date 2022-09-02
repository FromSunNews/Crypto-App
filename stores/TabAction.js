export const SET_TRADE_MODAL_VISIBILITY = 'SET_TRADE_MODAL_VISIBILITY'

export const setTradeModalVisibilitySuccess = (isVisible) => ({
    type: SET_TRADE_MODAL_VISIBILITY,
    payload: { isVisible }
})

export function setTradeModalVisibility(isVisible) {
    //return a function have param is dispatch
    return dispatch => {
        dispatch(setTradeModalVisibilitySuccess(isVisible))
    }
}