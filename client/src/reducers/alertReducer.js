const alertReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_ALERT":
      return action.data;
    case "CLEAR_ALERT":
      return action.data;
    default:
      return state;
  }
};
export default alertReducer;

// actions
export const notifyAndClear = (msg, type, milliseconds) => {
  return (dispatch) => {
    dispatch({
      type: "SET_ALERT",
      data: { msg, type },
    });
    setTimeout(() => {
      dispatch({
        type: "CLEAR_ALERT",
        data: null,
      });
    }, milliseconds * 1000);
  };
};

export const notifyAndPersist = (msg, type) => {
  return (dispatch) => {
    dispatch({
      type: "SET_ALERT",
      data: { msg, type, persist: true },
    });
  };
};

export const dismissNotification = () => {
  return (dispatch) => {
    dispatch({
      type: "CLEAR_ALERT",
      data: null,
    });
  };
};
