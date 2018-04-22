import React from "react";
import { Alert, View, TouchableOpacity, Text } from "react-native";
import { ImagePicker, Permissions } from "expo";
import { connect } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import { CameraSelectors, CameraActions } from "../Redux/Camera";
import styles from "./styles";

const CAMERA_OPTIONS = {
  allowsEditing: true
};

class CameraView extends React.Component {
  constructor() {
    super();
    this.takePhoto = this.takePhoto.bind(this);
  }
  async componentWillMount() {
    const cameraPermission = await Permissions.getAsync(Permissions.CAMERA);
    const cameraRollPermission = await Permissions.getAsync(
      Permissions.CAMERA_ROLL
    );
    if (cameraPermission.status !== "granted") {
      await Permissions.askAsync(Permissions.CAMERA);
    }
    if (cameraRollPermission.status !== "granted") {
      await Permissions.askAsync(Permissions.CAMERA_ROLL);
    }
  }
  componentWillReceiveProps(props) {
    if (!props.loading && this.props.loading) {
      if (props.result.status === 201) {
        Alert.alert("Success", props.result.text);
      } else {
        Alert.alert("Error", props.result.text);
      }
    }
  }
  async takePhoto() {
    const image = await ImagePicker.launchCameraAsync(CAMERA_OPTIONS);
    if (!image.cancelled) {
      this.props.imageTaken(image);
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this.takePhoto}>
          <Text style={styles.buttonText}>Take a Photo</Text>
        </TouchableOpacity>
        <Spinner visible={this.props.loading} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: CameraSelectors.loading(state),
    result: CameraSelectors.result(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    imageTaken: image => dispatch(CameraActions.imageTaken(image))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CameraView);
