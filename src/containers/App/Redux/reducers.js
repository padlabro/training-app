import { combineReducers } from "redux";
import table from "./tableReducer";
import modal from "../../../shared/modal/redux/reducer";

export default combineReducers({ table, modal });
