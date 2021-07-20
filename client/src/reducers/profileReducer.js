import { list, listRepos, read, remove, update } from "../api/profile-api";

const profileReducer = (
  state = { currentProfile: null, allProfiles: [], repos: [] },
  action
) => {
  switch (action.type) {
    case "ALL_PROFILES":
      return { ...state, allProfiles: action.data };
    case "CURRENT_PROFILE":
      return { ...state, currentProfile: action.data };
    case "PROFILE_REPOS":
      return { ...state, repos: action.data };
    case "RESET_STATE":
      return action.data;
    default:
      return state;
  }
};
export default profileReducer;

// helper
const getCachedUser = () => {
  if (localStorage.getItem("authUser")) {
    let cachedUser = JSON.parse(localStorage.getItem("authUser"));
    return cachedUser;
  } else {
    throw new Error("No authenticated User, cache is empty");
  }
};

// actions
export const getCurrentProfile = () => {
  return async (dispatch) => {
    try {
      let {
        user: { id },
      } = getCachedUser();
      let profile = await read(id);
      dispatch({
        type: "CURRENT_PROFILE",
        data: profile,
      });
    } catch ({ error }) {
      throw new Error(error);
    }
  };
};

export const updateProfile = (updatedProfile) => {
  return async (dispatch) => {
    try {
      let {
        token,
        user: { id },
      } = getCachedUser();
      let profile = await update(token, id, updatedProfile);
      console.log(profile);
      dispatch({
        type: "CURRENT_PROFILE",
        data: profile,
      });
    } catch ({ error }) {
      throw new Error(error);
    }
  };
};

export const deleteProfile = () => {
  return async (dispatch) => {
    try {
      let {
        token,
        user: { id },
      } = getCachedUser();
      await remove(token, id);
      dispatch({
        type: "RESET_STATE",
        data: { currentProfile: null, allProfiles: [], repos: [] },
      });
    } catch ({ error }) {
      throw new Error(error);
    }
  };
};

export const resetProfileReducer = () => {
  return (dispatch) => {
    dispatch({
      type: "RESET_STATE",
      data: { currentProfile: null, allProfiles: [], repos: [] },
    });
  };
};

export const getAllProfiles = () => {
  return async (dispatch) => {
    try {
      let profiles = await list();
      dispatch({
        type: "ALL_PROFILES",
        data: profiles,
      });
    } catch ({ error }) {
      throw new Error(error);
    }
  };
};

export const getAllRepos = (githubusername) => {
  return async (dispatch) => {
    try {
      let repos = await listRepos(githubusername);
      dispatch({
        type: "PROFILE_REPOS",
        data: repos,
      });
    } catch (error) {
      throw new Error(error);
    }
  };
};
