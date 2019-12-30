import { createAction } from "redux-actions";
import {
  showModalRequest,
  hideModalRequest
} from "../../../shared/modal/redux/actions";

export const fetchTrainingsRequest = createAction("FETCH_TRAINING_REQUEST");
export const fetchTrainingsSuccess = createAction("FETCH_TRAINING_SUCCESS");
export const fetchTrainingsFailure = createAction("FETCH_TRAINING_FAILURE");
export const filterTrainings = createAction("FILTER_TRAININGS");
export const sortTrainings = createAction("SORT_TRAININGS");
export const deleteTraining = createAction("DELETE_TRAINING");
export const editTraining = createAction("EDIT_TRAINING");
export const saveTraining = createAction("SAVE_TRAINING");
export const newTraining = createAction("NEW_TRAINING");

export const fetchTrainings = () => async dispatch => {
  await fetch("http://localhost:3000/trainings")
    .then(res => res.json())
    .then(res => dispatch(fetchTrainingsSuccess(res)));
};
export const handleFilterTrainings = data => async dispatch => {
  dispatch(filterTrainings(data));
};
export const handleSortTrainings = data => async dispatch => {
  dispatch(sortTrainings(data));
};
export const handleDeleteTraining = id => async dispatch => {
  await fetch(`http://localhost:3000/trainings/${id}`, {
    method: "DELETE"
  });
  await fetch("http://localhost:3000/trainings")
    .then(res => res.json())
    .then(res => dispatch(fetchTrainingsSuccess(res)));
};
export const handleEditTraining = id => async dispatch => {
  await dispatch(editTraining(id));
  dispatch(showModalRequest());
};
export const handleSaveTraining = data => async dispatch => {
  await fetch(`http://localhost:3000/trainings/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    credentials: "same-origin",
    body: JSON.stringify(data)
  });
  await dispatch(hideModalRequest());
  await fetch("http://localhost:3000/trainings")
    .then(res => res.json())
    .then(res => dispatch(fetchTrainingsSuccess(res)));
};
export const sortNewData = () => async dispatch => {
  await dispatch(editTraining(null));
};
export const handleNewTraining = () => async dispatch => {
  await dispatch(showModalRequest());
  dispatch(newTraining());
};
export const handleAddTraining = data => async dispatch => {
  await fetch(`http://localhost:3000/trainings/`, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    credentials: "same-origin",
    body: JSON.stringify(data)
  });
  await dispatch(hideModalRequest());
  await fetch("http://localhost:3000/trainings")
    .then(res => res.json())
    .then(res => dispatch(fetchTrainingsSuccess(res)));
};
