import ListOrder from "./ListOrder";
import { connect } from "react-redux";
const mapStateToProps = (state) => ({
  // listLiga: state.ligaReducer.listLigaData,
  // ligaError: state.ligaReducer.listLigaError,
  // ligaLoading: state.ligaReducer.listLigaLoading,
});
const mapStateToDispatch = (dispatch) => ({
  // getListLiga: () => dispatch(getListLiga()),
});
export default connect(mapStateToProps, mapStateToDispatch)(ListOrder);
