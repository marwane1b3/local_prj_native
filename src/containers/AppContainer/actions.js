import {
    GET_ENDPOINT_CALL_ACTION,
    GET_ENDPOINT_CALL_ACTION_FAIL,
    GET_ENDPOINT_CALL_ACTION_SUCCESS
} from './constants'

export function getEndpointCallAction() {
    return {
        type: GET_ENDPOINT_CALL_ACTION
    }
}


export function getEndpointCallActionSuccess(payload) {
    return {
        type: GET_ENDPOINT_CALL_ACTION_SUCCESS,
        payload
    }
}
export function getEndpointCallActionFail(error) {
    return {
        type: GET_ENDPOINT_CALL_ACTION_FAIL,
        error
    }
}