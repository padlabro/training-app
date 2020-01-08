import { handleActions } from 'redux-actions';

import { showModalRequest, hideModalRequest } from './actions';

const defaultState = {
  show: false,
  loading: false,
  error: null
};

export default handleActions(
  {
    [showModalRequest](state) {
      return {
        ...state,
        show: true
      };
    },
    [hideModalRequest](state) {
      return {
        ...state,
        show: false
      };
    }
  },
  defaultState
);
