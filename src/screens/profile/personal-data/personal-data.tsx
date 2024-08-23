import React, { useEffect, useRef, useState } from 'react';
import { Clipboard, Image, Text, Vibration, View } from 'react-native';
import { FieldSet } from '../../../components/common/text-box-field-set';
import { TextBox } from '../../../components/common/text-box';
import { Formik } from 'formik';
import { validationSchema } from './validationSchema';
import { PersonalDataStyles } from './styles';
import { Icon } from 'react-native-elements';
import NoAvatar from '../../../assets/images/no-avatar.png';
import { CustomButton } from '../../../components/common/custom-button';
import { colors } from '../../../main-styles';
import { useDispatch, useSelector } from 'react-redux';
import { UserProfileModel } from '../../../server/models/models';
import { PersonalDataForm } from './form/personalDataForm';
import { ChangePassword } from '../changePassword';
import { BottomSheet } from '../../../components/bottom-sheet';
import { SuccessView } from '../../../components/SuccessView/SuccessView';
import { getStoredUserPushToken } from '../../../redux/async-storage';
import {
  baseURL,
  requestDeletePhoto,
  requestSavePhoto,
} from '../../../server/requests';
import { getErrorObject } from '../../../utils/utils';
import { getUserProfile } from '../../../redux/thunks';
import { launchImageLibrary } from 'react-native-image-picker';
import { MaterialIndicator } from 'react-native-indicators';
import { KeyBoardScrollView } from '../../../components/KeyBoardScrollView';
import { logoutHandler } from '../../../utils/auth-utils';

export const PersonalData = (): JSX.Element => {
  const userProfile = useSelector<any>((state) => state.userStore.userProfile);
  const modalRef = useRef<any>();
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [photo, setPhoto] = useState<string | undefined>();
  const [closeIcon, setCloseIcon] = useState<boolean>(true);
  const dispatch = useDispatch();

  const closeModal = () => {
    modalRef.current.close();
  };

  const openModal = () => {
    setShowSuccess(false);
    modalRef.current.open();
  };

  const bottomSheetCloseHandler = () => {
    if (showSuccess) {
      logoutHandler(dispatch);
    }
  };

  useEffect(() => {
    getStoredUserPushToken().then((pushToken) =>
      setToken(pushToken ?? "you haven't token")
    );
  }, []);

  const copyToClipboard = () => {
    Clipboard.setString(token);
    Vibration.vibrate();
  };

  const addPhoto = () => {
    launchImageLibrary(
      { mediaType: 'photo', selectionLimit: 0 },
      (response) => {
        if (!response.didCancel && !!response?.assets?.[0]) {
          setLoading(true);
          requestSavePhoto(response.assets[0])
            .finally(() => setLoading(false))
            .then((response) => {
              if (response.status == 201) {
                dispatch(getUserProfile());
                setCloseIcon(true);
              } else {
                dispatch(getErrorObject());
              }
            });
        }
      }
    );
  };

  const deletePhoto = () => {
    setLoading(true);
    requestDeletePhoto()
      .finally(() => setLoading(false))
      .then((response) => {
        if (response.status == 204) {
          dispatch(getUserProfile());
          setCloseIcon(false);
          setPhoto(undefined);
        } else {
          dispatch(getErrorObject());
        }
      });
  };

  const actionImage = () => {
    if (closeIcon) {
      deletePhoto();
    } else {
      addPhoto();
    }
    setCloseIcon(!closeIcon);
  };

  useEffect(() => {
    if ((userProfile as UserProfileModel)?.photo) {
      const photoUrl = baseURL + '/' + (userProfile as UserProfileModel).photo;
      setPhoto(photoUrl);
      setCloseIcon(true);
    } else {
      setCloseIcon(false);
    }
  }, [userProfile]);

  return (
    <KeyBoardScrollView keyboardShouldPersistTaps="handled" offset={300}>
      <View style={PersonalDataStyles.avatarContainer}>
        <Icon
          type={'material'}
          name={closeIcon ? 'close' : 'add'}
          color={colors.middleGray}
          onPress={() => actionImage()}
          containerStyle={PersonalDataStyles.closeIcon}
          size={28}
        />
        {loading ? (
          <View style={PersonalDataStyles.load}>
            <MaterialIndicator color={colors.blue} />
          </View>
        ) : (
          <Image
            style={PersonalDataStyles.avatar}
            width={100}
            height={100}
            source={photo ? { uri: photo } : NoAvatar}
          />
        )}
      </View>

      <Text
        style={PersonalDataStyles.personalDataTitle}
        onLongPress={copyToClipboard}
      >
        Общие данные
      </Text>
      <View style={PersonalDataStyles.personalDataContainer}>
        <FieldSet
          placeholder="Фамилия"
          labelFieldSetStyle={{ backgroundColor: 'transparent' }}
          textBoxFieldSetContainerStyle={PersonalDataStyles.personalDataField}
        >
          <TextBox
            placeholder="Фамилия"
            value={(userProfile as UserProfileModel)?.surname}
            disabled
            disabledInputStyle={PersonalDataStyles.personalDataInputDisabled}
          />
        </FieldSet>

        <FieldSet
          placeholder="Имя"
          labelFieldSetStyle={{ backgroundColor: 'transparent' }}
          textBoxFieldSetContainerStyle={PersonalDataStyles.personalDataField}
        >
          <TextBox
            placeholder="Имя"
            value={(userProfile as UserProfileModel)?.name}
            disabled
            disabledInputStyle={PersonalDataStyles.personalDataInputDisabled}
          />
        </FieldSet>

        <FieldSet
          placeholder="Отчество"
          labelFieldSetStyle={{ backgroundColor: 'transparent' }}
          textBoxFieldSetContainerStyle={PersonalDataStyles.personalDataField}
        >
          <TextBox
            placeholder="Отчество"
            value={(userProfile as UserProfileModel)?.patronymic}
            disabled
            disabledInputStyle={PersonalDataStyles.personalDataInputDisabled}
          />
        </FieldSet>
      </View>

      <Text style={PersonalDataStyles.personalDataTitle}>Контакты</Text>
      <Formik
        validationSchema={validationSchema}
        initialValues={{ email: '', phone: '' }}
      >
        {(userProfile as UserProfileModel) && (
          <PersonalDataForm userProfile={userProfile as UserProfileModel} />
        )}
      </Formik>

      <View style={{ marginBottom: 102 }}>
        <CustomButton
          title={'Изменить пароль'}
          width={165}
          height={48}
          styles={PersonalDataStyles.changePassword}
          onPress={openModal}
        />
      </View>

      <BottomSheet
        ref={modalRef}
        title={'Изменение пароля'}
        height={450}
        onCloseCallback={bottomSheetCloseHandler}
      >
        {showSuccess ? (
          <SuccessView title={'Пароль успешно изменен'} close={closeModal} />
        ) : (
          <ChangePassword
            callback={() => setShowSuccess(true)}
            close={closeModal}
          />
        )}
      </BottomSheet>
    </KeyBoardScrollView>
  );
};
