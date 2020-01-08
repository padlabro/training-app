import { createAction } from 'redux-actions';
import { editTraining } from '../../App/Redux/actions';

export const showModalRequest = createAction('OPEN_MODAL');
export const hideModalRequest = createAction('HIDE_MODAL');

export const hideModal = () => async dispatch => {
  dispatch(hideModalRequest());
  dispatch(editTraining(null));
};
