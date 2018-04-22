import _ from "lodash";
import { RNS3 } from "react-native-aws3";
import { call, put } from "redux-saga/effects";
import { CameraTypes } from "../Redux/Camera";

const S3options = {
  bucket: "dott-test",
  region: "ap-southeast-1",
  accessKey: "AKIAIZSIV6YHFN25OGNQ",
  secretKey: "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",
  successActionStatus: 201
};

function* putImageToS3(action) {
  yield put({ type: CameraTypes.PUT_S3_START });
  try {
    const file = {
      uri: action.image.uri,
      name: _.last(action.image.uri.split("/")),
      type: "image/png"
    };
    const result = yield call(RNS3.put, file, S3options);
    if (result.status !== 201) throw result;
    yield put({ type: CameraTypes.PUT_S3_SUCCESS, result });
  } catch (err) {
    yield put({ type: CameraTypes.PUT_S3_FAIL, err });
  }
}

export { putImageToS3 };
