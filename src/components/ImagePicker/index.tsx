import React, { useEffect, useImperativeHandle, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { ImagePickerStyles } from './styles';
import CloseIcon from '../../assets/icons/svg/close-icon.svg';
import { useDispatch } from 'react-redux';
import { requestCreateImages, requestGetImages } from '../../server/requests';
import { ActionsService } from '../../redux/actions';
import { PopUpTypeConstants } from '../../constants/type-constants';
import { getErrorObject } from '../../utils/utils';
import { DotIndicator } from 'react-native-indicators';
import { colors } from '../../main-styles';

export const ImagePicker = React.forwardRef((props: ImagePickerProps, ref) => {
  const [attachments, setAttachments] = useState<Array<any>>([]);
  const [imageIsLoading, setImageIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const sendImage = (image: any) => {
    setImageIsLoading(true);

    requestCreateImages(image)
      .then((response) => {
        if (response.status === 201) {
          dispatch({
            type: ActionsService.SHOW_POPUP,
            payload: {
              message: 'Изборажение загружено',
              type: PopUpTypeConstants.SUCCESS,
            },
          });

          setAttachments([
            ...attachments,
            {
              name: image.fileName,
              uri: image.uri,
              type: image.type,
              size: image.fileSize,
              id: response.data,
            },
          ]);

          if (props.addFile) {
            props.addFile(response.data);
          }
        } else {
          dispatch(getErrorObject());
        }
      })
      .finally(() => setImageIsLoading(false));
  };

  const openGallery = (bottomSheetRef?: any) => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (!response.didCancel) {
        response.assets?.map((image) => {
          sendImage(image);
          bottomSheetRef?.current.close();
        });

        setAttachments([...attachments]);
      }
    });
  };

  const openCamera = (bottomSheetRef?: any) => {
    launchCamera({ mediaType: 'photo', cameraType: 'back' }, (response) => {
      if (!response.didCancel) {
        response.assets?.map((image) => {
          sendImage(image);
          bottomSheetRef?.current.close();
        });

        setAttachments([...attachments]);
      }
    });
  };

  const deleteImage = (fileName: string) => {
    attachments.splice(
      attachments.findIndex((item) => item.name === fileName),
      1
    );
    setAttachments([...attachments]);
  };

  useImperativeHandle(ref, () => ({
    openGallery: (bottomSheetRef?: any) => openGallery(bottomSheetRef),
    openCamera: (bottomSheetRef?: any) => openCamera(bottomSheetRef),
  }));

  useEffect(() => {
    if (props.photos && !props.isCreated) {
      props.photos.map((id) => {
        requestGetImages(id).then((response) => {
          if (response.status === 200) {
            attachments.push({
              id,
              uri: `data:application/pdf;base64,${response.data}`,
            });

            setAttachments([...attachments]);
          } else {
            dispatch(getErrorObject());
          }
        });
      });
    }
  }, [props.photos]);

  return (
    <View style={ImagePickerStyles.container}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={ImagePickerStyles.scrollContainer}
      >
        {attachments.map((image, index) => (
          <View key={image.name} style={ImagePickerStyles.imageContainer}>
            <TouchableOpacity
              onPressIn={() => {
                deleteImage(image.name);
                props.remove && props.remove(image.id, index);
              }}
            >
              <CloseIcon />
            </TouchableOpacity>

            <Image
              source={{ uri: image.uri }}
              width={100}
              height={100}
              style={ImagePickerStyles.image}
            />
          </View>
        ))}

        {imageIsLoading && (
          <View style={{ alignSelf: 'center', height: 50, zIndex: 9999 }}>
            <DotIndicator count={3} size={10} color={colors.blue} />
          </View>
        )}
      </ScrollView>
    </View>
  );
});

interface ImagePickerProps {
  photos?: Array<string>;
  addFile?: Function;
  remove?: Function;
  isCreated?: boolean;
}
