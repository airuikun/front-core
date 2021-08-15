import { combineReducers } from 'redux';
import authed from './authed';
import main from './main';


const rootReducer = combineReducers({
     authed,
     main
})

export default rootReducer