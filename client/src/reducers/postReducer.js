import {
  addComment,
  create,
  deleteComment,
  like,
  list,
  read,
  remove,
  unlike,
} from "../api/post-api";

const postReducer = (state = { allPosts: [], post: null }, action) => {
  switch (action.type) {
    case "GET_POSTS":
      return { ...state, allPosts: action.data };
    case "GET_POST":
      return { ...state, post: action.data };
    case "ADD_POST":
      return { ...state, allPosts: state.allPosts.concat(action.data) };
    case "REMOVE_POST":
      return {
        ...state,
        allPosts: state.allPosts.filter((p) => p._id !== action.data),
      };
    case "UPDATE_POST":
      let { _id } = action.data;
      return {
        ...state,
        allPosts: state.allPosts.map((p) => (p._id === _id ? action.data : p)),
      };
    case "ADD_COMMENT_TO_POST":
      return { ...state, post: action.data };
    case "DELETE_COMMENT":
      let { commentId } = action.data;
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter((c) => c._id !== commentId),
        },
      };
    case "RESET_STATE":
      return action.data;
    default:
      return state;
  }
};
export default postReducer;

// actions
export const getAllPosts = () => {
  return async (dispatch) => {
    try {
      const posts = await list();
      dispatch({
        type: "GET_POSTS",
        data: posts,
      });
    } catch ({ error }) {
      throw new Error(error);
    }
  };
};

export const addPost = (payload) => {
  return async (dispatch) => {
    try {
      const post = await create(payload);
      dispatch({
        type: "ADD_POST",
        data: post,
      });
    } catch ({ error }) {
      throw new Error(error);
    }
  };
};

export const likePost = (postId) => {
  return async (dispatch) => {
    try {
      const res = await like(postId);
      dispatch({
        type: "UPDATE_POST",
        data: res,
      });
    } catch ({ error }) {
      throw new Error(error);
    }
  };
};

export const unlikePost = (postId) => {
  return async (dispatch) => {
    try {
      const res = await unlike(postId);
      dispatch({
        type: "UPDATE_POST",
        data: res,
      });
    } catch ({ error }) {
      throw new Error(error);
    }
  };
};

export const removePost = (postId) => {
  return async (dispatch) => {
    try {
      await remove(postId);
      dispatch({
        type: "REMOVE_POST",
        data: postId,
      });
    } catch ({ error }) {
      throw new Error(error);
    }
  };
};

export const getPost = (postId) => {
  return async (dispatch) => {
    try {
      let post = await read(postId);
      dispatch({
        type: "GET_POST",
        data: post,
      });
    } catch ({ error }) {
      throw new Error(error);
    }
  };
};

export const addCommentToPost = (postId, comment) => {
  return async (dispatch) => {
    try {
      let res = await addComment(postId, comment);
      dispatch({
        type: "ADD_COMMENT_TO_POST",
        data: res,
      });
    } catch ({ error }) {
      throw new Error(error);
    }
  };
};

export const removeComment = (postId, commentId) => {
  return async (dispatch) => {
    try {
      let res = await deleteComment(postId, commentId);
      dispatch({
        type: "DELETE_COMMENT",
        data: { commentId, res },
      });
    } catch ({ error }) {
      throw new Error(error);
    }
  };
};

export const resetPostsReducer = () => {
  return (dispatch) => {
    dispatch({
      type: "RESET_STATE",
      data: { allPosts: [], post: null },
    });
  };
};
