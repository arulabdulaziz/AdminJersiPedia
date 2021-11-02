export const dispatchLoading = (dispatch, type, data = null) => {
  return dispatch({
    type,
    payload: {
      data,
      loading: true,
      errorMessage: "",
    },
  });
};
export const dispatchSuccess = (dispatch, type, data) => {
  return dispatch({
    type,
    payload: {
      data,
      loading: false,
      errorMessage: "",
    },
  });
};
export const dispatchError = (dispatch, type, errorMessage, data = null) => {
  return dispatch({
    type,
    payload: {
      data,
      loading: false,
      errorMessage,
    },
  });
};
