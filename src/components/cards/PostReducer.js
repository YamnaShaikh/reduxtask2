import { POST_LIST_FAIL, POST_LIST_REQUEST, POST_LIST_SUCCESS } from "./constant";

const initialState = {
    posts: [],
    error: null
}
export const postListReducer = ( state = initialState, action) => {
    // debugger;
    switch (action.type) {
        case POST_LIST_REQUEST:
          return { posts: [] };
    
        case POST_LIST_SUCCESS:
          return {  posts: [...action.payload] };

        case POST_LIST_FAIL:
            debugger;
          return { error: action.payload };

        default:
          return state;
      }
}