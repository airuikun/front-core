import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';
import createLogger from 'redux-logger';


const middlewares = [thunkMiddleware]

console.log(process.env)

if (process.env.NODE_ENV === `development`) {
  
  middlewares.push(createLogger());
}


const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export default function configureStore(preloadedState) {
    const store = createStoreWithMiddleware(rootReducer, preloadedState);
    return store
}