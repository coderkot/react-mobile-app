import React from 'react';
import { PermissionsAndroid, Platform, View } from 'react-native';
import { DefectStyles } from './style';
import { Button } from 'react-native-elements';
import { colors } from '../../../main-styles';
import { BottomSheet } from '../../../components/bottom-sheet';

export const DefectModal = React.forwardRef((props: DefectModalProps, ref) => {
  const openCamera = () => {
    props.imagePickerRef.current.openCamera(ref);
  };

  const openPhotos = () => {
    props.imagePickerRef.current.openGallery(ref);
  };

  const checkAndroidCameraPermissions = () => {
    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA).then(
      (granted) => {
        if (!granted) {
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
        } else {
          openCamera();
        }
      }
    );
  };

  const checkAndroidReadStoragePermissions = () => {
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
    ).then((granted) => {
      if (!granted) {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        );
      } else {
        openPhotos();
      }
    });
  };

  return (
    <BottomSheet ref={ref} title={'Добавление фотографии'}>
      <View style={DefectStyles.photoButtonsContainer}>
        <Button
          title={'Сделать фотографию'}
          onPressIn={() => {
            Platform.OS == 'ios'
              ? openCamera()
              : checkAndroidCameraPermissions();
          }}
          buttonStyle={DefectStyles.cameraButton}
        />
        <Button
          title={'Выбрать из галереи'}
          onPressIn={() => {
            Platform.OS == 'ios'
              ? openPhotos()
              : checkAndroidReadStoragePermissions();
          }}
          buttonStyle={DefectStyles.galleryButton}
          titleStyle={{ color: colors.darkGray }}
        />
      </View>
    </BottomSheet>
  );
});

interface DefectModalProps {
  imagePickerRef: any;
}
