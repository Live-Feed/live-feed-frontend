import { combineReducers } from "redux";

// reducer import
import customizationReducer from "./sseReducer";
import sessionReducer from "./sessionReducer";
import searchReducer from "./searchReducer";
import settingReducer from "./settingReducer";

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  sse: sseReducer,
});

export default reducer;
