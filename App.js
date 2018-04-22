import React from 'react';
import { Provider } from 'react-redux'
import store from './src/Redux/';
import CameraView from './src/Components/CameraView';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <CameraView />
      </Provider>
    )
  }
}
