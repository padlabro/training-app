import { createAction } from 'redux-actions';

export const hideErrorModal = createAction('HIDE_ERROR_MODAL');

export const hideModal = () => async dispatch => {
  dispatch(hideErrorModal());
};
