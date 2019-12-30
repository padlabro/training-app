import { createAction } from "redux-actions";
import { editTraining } from "../../../containers/App/Redux/actions";

export const showModalRequest = createAction("OPEN_MODAL");
export const hideModalRequest = createAction("HIDE_MODAL");
export const modalError = createAction("MODAL_ERROR");

export const hideModal = () => async dispatch => {
  const modal = {
    show: false
  };
  dispatch(hideModalRequest(modal));
  dispatch(editTraining(null));
};
