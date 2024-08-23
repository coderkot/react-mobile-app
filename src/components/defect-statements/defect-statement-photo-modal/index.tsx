import React, { useState } from 'react';
import {
  GestureResponderEvent,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Hr } from '../../common/hr';
import { styles } from './styles';

// import { Camera } from 'expo-camera';
// import { TakePhoto } from '../../common/take-photo';
// let camera: Camera | null;

export const DefectStatementPhotoModal: React.FC<PhotoModalProps> = (props) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [showPhotoCamera, setShowPhotoCamera] = useState(false);
  const [canTakePhoto, setCanTakePhoto] = useState(false);

  React.useEffect(() => {
    (async () => {
      // const { status } = await Camera.requestPermissionsAsync();
      // setHasPermission(status === 'granted');
    })();
  }, []);

  const content = !hasPermission ? (
    <Text>Нет доступа к камере</Text>
  ) : showPhotoCamera ? (
    // <Camera
    //   style={styles.camera}
    //   type={Camera.Constants.Type.back}
    //   ref={(r) => {
    //     camera = r;
    //   }}
    // >
    //   <View style={styles.photoContainer}>
    //     <TakePhoto
    //       containerStyle={styles.photoButton}
    //       disabled={!canTakePhoto}
    //       onPress={async () => {
    //         if (camera && onTakePhoto) {
    //           setCanTakePhoto(false);
    //           const photo: any = await camera.takePictureAsync();
    //           onTakePhoto(photo);
    //           setShowPhotoCamera(false);
    //         }
    //       }}
    //     />
    //   </View>
    // </Camera>
    <Text>Camera Here!</Text>
  ) : null;

  return (
    <Modal visible={props.visible} transparent={true}>
      <View style={styles.container}>
        <View
          style={{
            height: '100%',
          }}
        >
          {content}
        </View>
        {!showPhotoCamera ? (
          <View style={styles.subContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.text}>Добавление фотографии</Text>
              <TouchableOpacity onPress={props.onClose}>
                <Icon name="close" color="black" size={50} />
              </TouchableOpacity>
            </View>
            <Hr />
            <View style={styles.btnContainer}>
              <Button
                buttonStyle={styles.takePhotoBtn}
                onPress={() => {
                  setShowPhotoCamera((prev) => !prev);
                  setCanTakePhoto(true);
                }}
                title="Сделать фотографию"
              />
              <Button
                buttonStyle={styles.selectPhotoBtn}
                titleStyle={{
                  color: 'black',
                }}
                onPress={props.onSelectPhoto}
                title="Выбрать из галереи"
              />
            </View>
          </View>
        ) : null}
      </View>
    </Modal>
  );
};

interface PhotoModalProps {
  onTakePhoto?: (event: any) => void;
  onSelectPhoto?: (event: GestureResponderEvent) => void;
  onClose?: (event: GestureResponderEvent) => void;
  visible?: boolean;
}
