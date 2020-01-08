import { combineReducers } from 'redux';
import table from './tableReducer';
import mainModal from '../../MainModal/redux/reducer';
import errorModal from '../../ErrorModal/redux/reducer';

export default combineReducers({ table, mainModal, errorModal });
