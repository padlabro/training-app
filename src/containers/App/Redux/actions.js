import { createAction } from 'redux-actions';
import { showModalRequest, hideModalRequest } from '../../MainModal/redux/actions';
import api from '../../../utils/api';

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
    const responce = await api.getData();
    await dispatch(fetchTrainingsSuccess(responce));
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

export const fetchDeleteTrainingRequest = createAction('FETCH_DELETE_TRAINING_REQUEST');
export const fetchDeleteTrainingSuccess = createAction('FETCH_DELETE_TRAINING_SUCCESS');

export const handleDeleteTraining = id => async dispatch => {
  dispatch(fetchDeleteTrainingRequest());
  try {
    await api.deleteData(id);
    const responce = await api.getData();
    dispatch(fetchTrainingsSuccess(responce));
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
    await api.editData(data);
    await dispatch(hideModalRequest());
    const responce = await api.getData();
    dispatch(fetchTrainingsSuccess(responce));
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
    await api.postData(data);
    await dispatch(hideModalRequest());
    const responce = await api.getData();
    dispatch(fetchTrainingsSuccess(responce));
  } catch (error) {
    dispatch(fetchFailure(error));
  }
};
