import axios from "axios";
const baseUrl = "/api/posts";

// list all posts
export const list = async () => {
  if (localStorage.getItem("authUser")) {
    const { token } = JSON.parse(localStorage.getItem("authUser"));
    try {
      const response = await axios.get(baseUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
};

// create a post
export const create = async (payload) => {
  if (localStorage.getItem("authUser")) {
    const { token } = JSON.parse(localStorage.getItem("authUser"));
    try {
      const response = await axios.post(baseUrl, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
};

export const remove = async (postId) => {
  if (localStorage.getItem("authUser")) {
    const { token } = JSON.parse(localStorage.getItem("authUser"));
    try {
      const response = await axios.delete(`${baseUrl}/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
};

export const like = async (postId) => {
  if (localStorage.getItem("authUser")) {
    const { token } = JSON.parse(localStorage.getItem("authUser"));
    try {
      const response = await axios.put(`${baseUrl}/like/${postId}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
};

export const unlike = async (postId) => {
  if (localStorage.getItem("authUser")) {
    const { token } = JSON.parse(localStorage.getItem("authUser"));
    try {
      const response = await axios.put(`${baseUrl}/unlike/${postId}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
};

export const read = async (postId) => {
  if (localStorage.getItem("authUser")) {
    let { token } = JSON.parse(localStorage.getItem("authUser"));
    try {
      let response = await axios.get(`${baseUrl}/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
};

export const addComment = async (postId, payload) => {
  if (localStorage.getItem("authUser")) {
    let { token } = JSON.parse(localStorage.getItem("authUser"));
    try {
      let response = await axios.post(
        `${baseUrl}/comments/${postId}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
};

export const deleteComment = async (postId, commentId) => {
  if (localStorage.getItem("authUser")) {
    let { token } = JSON.parse(localStorage.getItem("authUser"));
    try {
      let response = await axios.delete(
        `${baseUrl}/comments/${postId}/${commentId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
};
