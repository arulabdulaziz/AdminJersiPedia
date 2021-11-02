import {
  GET_LIST_LIGA,
  GET_DETAIL_LIGA,
  DELETE_DETAIL_LIGA
} from "../actions";
const initialState = {
  listLigaData: [],
  listLigaLoading: false,
  listLigaError: "",

  detailLigaData: null,
  detailLigaLoading: false,
  detailLigaError: "",
};
function ligaReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_LIGA:
      return {
        ...state,
        listLigaData: action.payload.data,
        listLigaLoading: action.payload.loading,
        listLigaError: action.payload.errorMessage,
      };
    case GET_DETAIL_LIGA:
      return {
        ...state,
        detailLigaData: action.payload.data,
        detailLigaLoading: action.payload.loading,
        detailLigaError: action.payload.errorMessage,
      };
    case DELETE_DETAIL_LIGA:
      return {
        ...state,
        detailLigaData: null,
        detailLigaLoading: false,
        detailLigaError: "",
      };
    default:
      return state;
  }
}
export default ligaReducer;
