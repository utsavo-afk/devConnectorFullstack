import axios from "axios";
const baseUrl = "/api/users";

export const signup = async (payload) => {
  try {
    let res = await axios.post(baseUrl, payload);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
