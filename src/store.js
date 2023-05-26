//import userReducer from './Reducer/UserReducer';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import userReducer from './components/UserReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { postListReducer } from './components/cards/PostReducer';

const reducer = combineReducers({
    userList : userReducer,
    postList : postListReducer
})

const Store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );

export default Store