import { handleActions } from "redux-actions";
import {
  fetchTrainingsRequest,
  fetchTrainingsSuccess,
  fetchTrainingsFailure,
  filterTrainings,
  sortTrainings,
  deleteTraining,
  editTraining,
  newTraining
} from "./actions";

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
    [fetchTrainingsFailure](state, { payload }) {
      return {
        ...state,
        isFetching: false,
        error: payload
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
    [deleteTraining](state, { payload }) {
      return {
        ...state,
        data: state.data.filter((item, i) => i !== payload)
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
