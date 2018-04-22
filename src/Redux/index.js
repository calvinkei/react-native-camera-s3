import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { CameraKey, CameraReducers } from "./Camera";
import rootSaga from "../Sagas";

const rootReducer = combineReducers({
  [CameraKey]: CameraReducers
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
