import React, { useEffect, useRef, useState } from 'react';
import { Formik } from 'formik';
import { ImageBackground, Text, View } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { Hr } from '../../../components/common/hr';
import { loginValidationSchema } from '../validators';
import { LoginStyles } from './styles';
import BackgroundImg from '../../../assets/images/screen-background.png';
import { colors, MainStyles } from '../../../main-styles';
import { useNavigation } from '@react-navigation/native';
import { requestLogin } from '../../../server/requests';
import {
  getJobRequestsDictionary,
  getUserProfile,
} from '../../../redux/thunks';
import { ActionsService } from '../../../redux/actions';
import {
  PopUpTypeConstants,
  PopUpZone,
} from '../../../constants/type-constants';
import { applyPhoneMask } from '../../../utils/utils';
import { Popup } from '../../../components/popup';
import { MessagePopUp } from '../../../redux/reducers';
import { Logo } from '../../../components/common/logo';
import { saveLoggedIn } from '../../../redux/async-storage';
import { KeyBoardScrollView } from '../../../components/KeyBoardScrollView';
import PushNotification from 'react-native-push-notification';

export const SignInScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const passwordRef = useRef<any>();
  const [hidePassword, setHidePassword] = useState(true);
  const [dataIsValid, setDataIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const popupRef = useRef<any>();

  const messagePopUp = useSelector<any>(
    (state) => state.serviceStore.messagePopUp
  );

  const onLogin = async (values: { phone: string; password: string }) => {
    if (dataIsValid) {
      await requestLogin(values.phone, values.password).then((response) => {
        if (response && response.status === 200) {
          setIsLoading(false);
          PushNotification.requestPermissions();
          dispatch(getUserProfile());
          dispatch(getJobRequestsDictionary());

          saveLoggedIn();
        } else {
          setIsLoading(false);
          dispatch({
            type: ActionsService.SHOW_POPUP,
            payload: {
              message: 'Неверный логин или пароль',
              type: PopUpTypeConstants.ERROR,
              zone: PopUpZone.AUTH,
            },
          });
        }
      });
    }
  };

  useEffect(() => {
    const messageData = messagePopUp as MessagePopUp;
    if (messageData?.zone === PopUpZone.AUTH && messageData?.message) {
      popupRef.current.show();
    }
  }, [messagePopUp]);

  return (
    <ImageBackground
      source={BackgroundImg}
      resizeMode={'cover'}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <KeyBoardScrollView
        offset={200}
        showsVerticalScrollIndicator={false}
        onScroll={(event) => {
          setOffset(event.nativeEvent.contentOffset.y);
        }}
        keyboardShouldPersistTaps={'handled'}
      >
        <View style={LoginStyles.loginContainer}>
          <Logo showTitle={true} />

          <View style={LoginStyles.formContainer}>
            <Text style={LoginStyles.subHeader}>Авторизация</Text>
            <Hr style={{ marginBottom: 44 }} />
            <Formik
              validationSchema={loginValidationSchema}
              initialValues={{ phone: '', password: '' }}
              onSubmit={(values) => onLogin(values)}
            >
              {(formikProps) => (
                <>
                  <Input
                    onBlur={formikProps.handleBlur('phone')}
                    value={formikProps.values.phone}
                    inputStyle={LoginStyles.input}
                    containerStyle={LoginStyles.inputContainer}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    placeholder={'Телефон'}
                    placeholderTextColor={colors.gray}
                    keyboardType={'phone-pad'}
                    returnKeyType={'next'}
                    onSubmitEditing={() => passwordRef.current.focus()}
                    blurOnSubmit={false}
                    disabled={isLoading}
                    errorMessage={
                      formikProps.touched.phone && formikProps.errors.phone
                        ? formikProps.errors.phone
                        : ''
                    }
                    onChangeText={(number) => {
                      formikProps.setFieldValue(
                        'phone',
                        applyPhoneMask(number)
                      );
                    }}
                  />
                  <Input
                    onChangeText={formikProps.handleChange('password')}
                    onBlur={formikProps.handleBlur('password')}
                    value={formikProps.values.password}
                    blurOnSubmit={false}
                    onSubmitEditing={() => {
                      setDataIsValid(formikProps.isValid);
                      formikProps.handleSubmit();
                    }}
                    secureTextEntry={hidePassword}
                    inputStyle={LoginStyles.input}
                    containerStyle={LoginStyles.inputContainer}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    placeholder={'Пароль'}
                    placeholderTextColor={colors.gray}
                    ref={passwordRef}
                    disabled={isLoading}
                    rightIcon={
                      <Icon
                        type={'octicon'}
                        name={hidePassword ? 'eye-closed' : 'eye'}
                        color={colors.middleGray}
                        onPress={() => setHidePassword(!hidePassword)}
                        size={28}
                        iconStyle={{
                          color: !hidePassword
                            ? colors.blue
                            : colors.middleGray,
                        }}
                      />
                    }
                    rightIconContainerStyle={{
                      position: 'absolute',
                      right: 16,
                    }}
                    errorMessage={
                      formikProps.touched.password &&
                      formikProps.errors.password
                        ? formikProps.errors.password
                        : ''
                    }
                  />
                  <Button
                    title="Войти"
                    buttonStyle={[
                      MainStyles.defaultButtonStyle,
                      {
                        marginTop: 30,
                        marginBottom: 16,
                        paddingHorizontal: 60,
                      },
                    ]}
                    onPress={() => {
                      setDataIsValid(formikProps.isValid);
                      formikProps.handleSubmit();
                    }}
                    loading={isLoading}
                    disabled={isLoading}
                    disabledStyle={{ backgroundColor: colors.blue }}
                  />
                  <Button
                    title="Восстановить пароль"
                    titleStyle={{ color: colors.black }}
                    buttonStyle={{
                      backgroundColor: 'transparent',
                      paddingVertical: 0,
                    }}
                    containerStyle={{ marginBottom: 33 }}
                    onPress={() => {
                      formikProps.resetForm();
                      navigation.navigate('Recovery', {
                        phone: !formikProps.errors.phone
                          ? formikProps.values.phone
                          : '',
                      });
                    }}
                  />
                  <Hr style={{ marginBottom: 30 }} />
                  <Button
                    title="Регистрация"
                    titleStyle={{ color: colors.black }}
                    buttonStyle={{
                      backgroundColor: 'transparent',
                      paddingVertical: 0,
                    }}
                    containerStyle={{ marginBottom: 30 }}
                    onPress={() => {
                      formikProps.resetForm();
                      navigation.navigate('Registration');
                    }}
                  />
                </>
              )}
            </Formik>
          </View>
        </View>
      </KeyBoardScrollView>
      <Popup
        ref={popupRef}
        message={messagePopUp?.message}
        type={messagePopUp?.type}
      />
    </ImageBackground>
  );
};
