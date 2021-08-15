import * as types from '../constants/ActionTypes';

const initState = {
   
        avgTime : '0',
        bounceRate : '0',
        totalVisitors : '0',
        uniqueVisitors : '0',
        uv : [],
        pv : [],
        legends : [],

        chartShow : true
    
}


const main = (state = initState, action) => {
    switch(action.type) {
        case types.MAIN_RECEIVE_SUMMARY: {
            return Object.assign({}, state, {
                avgTime : action.data.avgTime,
                bounceRate : action.data.bounceRate,
                totalVisitors : action.data.totalVisitors,
                uniqueVisitors : action.data.uniqueVisitors,
            });
        }

        case types.MAIN_RECEIVE_LINECHART: {
            return Object.assign({}, state, {
                uv : action.data.uv,
                pv : action.data.pv,
                legends : action.data.legends
            })
        }

        case types.MAIN_LINECHART_DELETED : {
            return Object.assign({}, state, {
                chartShow : false
            })
        }
           
        default:
            return state;
    }
}

export default main;
