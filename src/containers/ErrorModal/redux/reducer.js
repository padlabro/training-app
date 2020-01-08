import { handleActions } from 'redux-actions';

import { hideErrorModal } from './actions';

import { fetchFailure } from '../../App/Redux/actions';

const defaultState = {
  error: '',
  show: false
};

export default handleActions(
  {
    [fetchFailure](state, { payload }) {
      return {
        ...state,
        error: payload.message,
        show: true
      };
    },
    [hideErrorModal](state) {
      return {
        ...state,
        show: false
      };
    }
  },
  defaultState
);
