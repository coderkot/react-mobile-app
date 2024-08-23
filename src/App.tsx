import React, { useEffect } from 'react';
import { AppNavigator } from './navigation/root-navigation';
import { Provider } from 'react-redux';
import store from './redux/store';
import { PermissionsAndroid } from 'react-native';

const App: () => JSX.Element = () => {
  useEffect(() => {
    PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]);
  }, []);

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
