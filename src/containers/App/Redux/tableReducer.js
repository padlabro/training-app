import { handleActions } from 'redux-actions';
import {
  fetchTrainingsRequest,
  fetchTrainingsSuccess,
  fetchDeleteTrainingRequest,
  fetchSaveTrainingRequest,
  fetchAddTrainingRequest,
  filterTrainings,
  sortTrainings,
  editTraining,
  newTraining,
  fetchFailure
} from './actions';

const defaultState = {
  initialData: [],
  data: [],
  addedNewTraining: false,
  error: null,
  isFetching: false,
  edit: null
};

export default handleActions(
  {
    [fetchTrainingsRequest](state) {
      return {
        ...state,
        isFetching: true
      };
    },
    [fetchTrainingsSuccess](state, { payload }) {
      return {
        ...state,
        initialData: payload,
        data: payload,
        isFetching: false,
        error: null
      };
    },
    [fetchDeleteTrainingRequest](state) {
      return {
        ...state,
        isFetching: true
      };
    },
    [fetchSaveTrainingRequest](state) {
      return {
        ...state,
        isFetching: true
      };
    },
    [fetchAddTrainingRequest](state) {
      return {
        ...state,
        isFetching: true
      };
    },
    [fetchFailure](state) {
      return {
        ...state,
        isFetching: false
      };
    },
    [filterTrainings](state, { payload }) {
      return {
        ...state,
        data: payload
      };
    },
    [sortTrainings](state, { payload }) {
      return {
        ...state,
        data: payload
      };
    },
    [editTraining](state, { payload }) {
      return {
        ...state,
        edit: payload,
        addedNewTraining: false
      };
    },
    [newTraining](state) {
      return {
        ...state,
        addedNewTraining: true
      };
    }
  },

  defaultState
);
