import * as types from '../constants/ActionTypes';
import $ from 'jquery';
import history from '../store/history';

import 'whatwg-fetch';

export function checkAuth() {
    return dispatch => {
        fetch('/auth/status',  {
                credentials: 'same-origin'
            })
            .then( tresponse => {
                return tresponse.json()
            })
            .then( tjson => {

                if(tjson.isLogin == false) {
                    history.push('/signin')
                }
            })
    }
}

export function authUser(authinfo) {
    return dispatch => {
        $.ajax('/auth/login', {
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data : JSON.stringify(authinfo),
                async : true,
                success: function(data, status, xhr) {
                    if(data.status == 400) {
                        alert('Login errro, username/password is test/test')
                        dispatch({
                            type : types.AUTH_FAILED
                        })
                    } else {
                        dispatch({
                            type : types.AUTH_SUCCESS
                        })
                        history.push('/main')
                    }
                },
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true
        });
    }
}


