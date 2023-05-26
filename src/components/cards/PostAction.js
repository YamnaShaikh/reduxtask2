import axios from "axios";
import { POST_LIST_FAIL, POST_LIST_REQUEST, POST_LIST_SUCCESS } from "./constant";

export const postListFetch = ( page = 1, limit = 20 ) => async (dispatch) => {
  try {
    // debugger;
    dispatch({ type: POST_LIST_REQUEST });
    const { data }  = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`);
    dispatch({
      type: POST_LIST_SUCCESS,
      payload: data
    });
    debugger;
  } catch (error) {
    debugger;
    dispatch({
      type: POST_LIST_FAIL,
      payload: error.message
    });
  }
};