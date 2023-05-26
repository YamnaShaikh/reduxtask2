import axios from "axios";
import {
  POST_LIST_FAIL,
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
} from "./constant";

export const postListFetch = (page = 1, limit = 20) =>
  async (dispatch) => {
    try {
       debugger;
      dispatch({ type: POST_LIST_REQUEST });
      const { data, headers } = await axios.get(
        `https://jsonplaceholder.typicode.com/posts`,
        {
          params: {
            _page: page,
            _limit: limit,
          },
        }
      );
      const totalPosts = parseInt(headers["x-total-count"]);
      const totalPages = Math.ceil(totalPosts / limit);
      dispatch({
        type: POST_LIST_SUCCESS,
        payload: { data, totalPages },
      });
      debugger;
    } catch (error) {
    //   debugger;
      dispatch({
        type: POST_LIST_FAIL,
        payload: error.message,
      });
    }
  };
