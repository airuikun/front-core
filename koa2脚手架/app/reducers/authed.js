import $ from 'jquery';
import * as types from '../constants/ActionTypes';


const auth = (state = [], action) => {
    switch(action.type) {
        case types.AUTH_SUCCESS:
            return state;
        case types.AUTH_FAILED:
            return state;
        default:
            return state;
    }
}

export default auth;

