import FIREBASE from "../../../config/FIREBASE";
import {
  dispatchLoading,
  dispatchSuccess,
  dispatchError,
} from "../../../utils";
export const GET_LIST_LIGA = "GET_LIST_LIGA";
export const GET_DETAIL_LIGA = "GET_DETAIL_LIGA";
export const DELETE_DETAIL_LIGA = "DELETE_DETAIL_LIGA";
export const getListLiga = () => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_LIST_LIGA, []);
    // console.log("value, ligas")
    FIREBASE.database()
      .ref("ligas")
      .once("value", (querySnapShot) => {
        let value = querySnapShot.val() ? querySnapShot.val() : null;
        if (!value) value = [];
        else {
          value = Object.keys(value).map((e) => ({ ...value[e], uid: e }));
        }
        // console.log(value, "<<< value ligas");
        dispatchSuccess(dispatch, GET_LIST_LIGA, value);
      })
      .catch((err) => {
        console.log("Error: ", JSON.stringify(err));
        dispatchError(dispatch, GET_LIST_LIGA, JSON.stringify(err), []);
      });
  };
};
export const getDetailLiga = (id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_LIGA, null);
    // console.log("value, ligas")
    FIREBASE.database()
      .ref("ligas/" + id)
      .once("value", (querySnapShot) => {
        let value = querySnapShot.val()
          ? { ...querySnapShot.val(), uid: id }
          : null;
        console.log(value, "<<< value ligas");
        dispatchSuccess(dispatch, GET_DETAIL_LIGA, value);
      })
      .catch((err) => {
        console.log("Error: ", JSON.stringify(err));
        dispatchError(dispatch, GET_DETAIL_LIGA, JSON.stringify(err), null);
      });
  };
};
export const deleteDetailLiga = () => {
  return (dispatch) => {
    dispatch({
      type: DELETE_DETAIL_LIGA,
    });
  };
};
