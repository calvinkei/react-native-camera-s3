import { takeEvery } from "redux-saga/effects";
import { CameraTypes } from "../Redux/Camera";
import { putImageToS3 } from "./Camera";

function* rootSaga() {
  yield takeEvery(CameraTypes.IMAGE_TAKEN, putImageToS3);
}

export default rootSaga;
