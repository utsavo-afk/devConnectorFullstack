import axios from "axios";
const baseUrl = "/api/auth";

export const signin = async (payload) => {
  try {
    const response = await axios.post(`${baseUrl}/signin`, payload);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
