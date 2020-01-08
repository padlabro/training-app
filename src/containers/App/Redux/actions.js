import { createAction } from 'redux-actions';
import { showModalRequest, hideModalRequest } from '../../MainModal/redux/actions';

export const filterTrainings = createAction('FILTER_TRAININGS');
export const sortTrainings = createAction('SORT_TRAININGS');
export const editTraining = createAction('EDIT_TRAINING');
export const newTraining = createAction('NEW_TRAINING');

export const fetchTrainingsRequest = createAction('FETCH_TRAINING_REQUEST');
export const fetchTrainingsSuccess = createAction('FETCH_TRAINING_SUCCESS');
export const fetchFailure = createAction('FETCH_FAILURE');

export const fetchTrainings = () => async dispatch => {
  try {
    dispatch(fetchTrainingsRequest());
    await fetch('http://localhost:3000/trainings')
      .then(res => res.json())
      .then(res => dispatch(fetchTrainingsSuccess(res)));
  } catch (error) {
    dispatch(fetchFailure(error));
  }
};
export const handleFilterTrainings = data => async dispatch => {
  dispatch(filterTrainings(data));
};
export const handleSortTrainings = data => async dispatch => {
  dispatch(sortTrainings(data));
};

export const fetchDeleteTrainingRequest = createAction('FETCH_DELETETRAINING_REQUEST');
export const fetchDeleteTrainingSuccess = createAction('FETCH_DELETETRAINING_SUCCESS');

export const handleDeleteTraining = id => async dispatch => {
  dispatch(fetchDeleteTrainingRequest());
  try {
    await fetch(`http://localhost:3000/trainings/${id}`, {
      method: 'DELETE'
    });
    await fetch('http://localhost:3000/trainings')
      .then(res => res.json())
      .then(res => dispatch(fetchTrainingsSuccess(res)));
  } catch (error) {
    dispatch(fetchFailure(error));
  }
};
export const handleEditTraining = id => async dispatch => {
  await dispatch(editTraining(id));
  dispatch(showModalRequest());
};

export const fetchSaveTrainingRequest = createAction('FETCH_SAVE_TRAINING_REQUEST');
export const fetchSaveTrainingSuccess = createAction('FETCH_SAVE_TRAINING_SUCCESS');

export const handleSaveTraining = data => async dispatch => {
  dispatch(fetchSaveTrainingRequest());
  try {
    await fetch(`http://localhost:3000/trainings/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      credentials: 'same-origin',
      body: JSON.stringify(data)
    });
    await dispatch(hideModalRequest());
    await fetch('http://localhost:3000/trainings')
      .then(res => res.json())
      .then(res => dispatch(fetchTrainingsSuccess(res)));
  } catch (error) {
    dispatch(fetchFailure(error));
  }
};
export const sortNewData = () => async dispatch => {
  await dispatch(editTraining(null));
};
export const handleNewTraining = () => async dispatch => {
  await dispatch(showModalRequest());
  dispatch(newTraining());
};

export const fetchAddTrainingRequest = createAction('FETCH_ADD_TRAINING_REQUEST');
export const fetchAddTrainingSuccess = createAction('FETCH_ADD_TRAINING_SUCCESS');

export const handleAddTraining = data => async dispatch => {
  dispatch(fetchAddTrainingRequest());
  try {
    await fetch(`http://localhost:3000/trainings/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      credentials: 'same-origin',
      body: JSON.stringify(data)
    });
    await dispatch(hideModalRequest());
    await fetch('http://localhost:3000/trainings')
      .then(res => res.json())
      .then(res => dispatch(fetchTrainingsSuccess(res)));
  } catch (error) {
    dispatch(fetchFailure(error));
  }
};
