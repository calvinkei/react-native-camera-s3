import { createReducer, createActions } from "reduxsauce";
import { fromJS } from "immutable";

const CameraKey = "Camera";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  imageTaken: ["image"],
  putS3Start: null,
  putS3Success: ["result"],
  putS3Fail: ["err"]
});

const CameraTypes = Types;
const CameraActions = Creators;

/* ------------- Initial State ------------- */

const INITIAL_STATE = fromJS({
  result: {},
  loading: false
});

/* ------------- Selectors ------------- */

const CameraSelectors = {
  result: state => state[CameraKey].get("result").toJS(),
  loading: state => state[CameraKey].get("loading")
};

/* ------------- Reducers ------------- */

const putS3Start = (state, action) => state.set("loading", true);

const putS3Success = (state, action) =>
  state.set("result", fromJS(action.result)).set("loading", false);

const putS3Fail = (state, action) =>
  state.set("result", fromJS(action.err)).set("loading", false);

/* ------------- Hookup Reducers To Types ------------- */

const CameraReducers = createReducer(INITIAL_STATE, {
  [Types.PUT_S3_START]: putS3Start,
  [Types.PUT_S3_SUCCESS]: putS3Success,
  [Types.PUT_S3_FAIL]: putS3Fail
});

export {
  CameraKey,
  CameraTypes,
  CameraActions,
  CameraSelectors,
  CameraReducers
};
