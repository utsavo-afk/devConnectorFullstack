import axios from "axios";
const baseUrl = "/api/profiles";

export const read = async (id) => {
  try {
    let response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const create = async (payload) => {
  if (localStorage.getItem("authUser")) {
    let authUser = JSON.parse(localStorage.getItem("authUser"));
    const { token } = authUser;
    try {
      let response = await axios.post(baseUrl, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
};

export const update = async (token, id, payload) => {
  try {
    let response = await axios.put(`${baseUrl}/${id}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const remove = async (token, id) => {
  try {
    let response = await axios.delete(`${baseUrl}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const list = async () => {
  try {
    let response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const listRepos = async (githubusername) => {
  try {
    let response = await axios.get(`/api/profile/${githubusername}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
