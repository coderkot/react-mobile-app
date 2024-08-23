import React, { useRef, useState } from 'react';
import { Formik } from 'formik';
import {
  ImageBackground,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { Hr } from '../../../components/common/hr';
import { TextButton } from '../../../components/common/text-button';
import { signupValidationSchema } from '../validators';
import { SignUpStyles } from './styles';
import { useNavigation } from '@react-navigation/native';
import BackgroundImg from '../../../assets/images/screen-background.png';
import Logo from '../../../assets/images/logo.svg';
import { colors } from '../../../main-styles';
import { applyPhoneMask } from '../../../utils/utils';
import {
  requestActivateCode,
  requestRegistrationInspector,
  requestSendRepeatCode,
} from '../../../server/requests';
import { UserStore } from '../../../redux/reducers';
import {
  getJobRequestsDictionary,
  getUserProfile,
} from '../../../redux/thunks';
import { ActionsUser } from '../../../redux/actions';
import { PinInput } from '../../../components/PinInput/PinInput';
import { Popup } from '../../../components/popup';
import { PopUpTypeConstants } from '../../../constants/type-constants';

export const SignupScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const nameRef = useRef<any>();
  const patronymicRef = useRef<any>();
  const phoneRef = useRef<any>();
  const passwordRef = useRef<any>();
  const passwordConfirmRef = useRef<any>();
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [dataIsValid, setDataIsValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hidePasswordConfirm, setHidePasswordConfirm] = useState<boolean>(true);
  const [pin, showPin] = useState<boolean>(false);
  const errorRef = useRef<any>();
  const errorConnectionRef = useRef<any>();
  const url = 'https://diagnostpb.ru/api/static/privacy-policy.pdf';
  const userStore = useSelector<any>((state) => state.userStore);
  const initialValues = {
    surname: '',
    name: '',
    patronymic: '',
    phone: '',
    password: '',
    passwordConfirm: '',
  };

  const handleOnComplete = (value: string) => {
    requestActivateCode(value, (userStore as UserStore).userId).then(
      (response) => {
        if (response.status === 200) {
          setIsLoading(!isLoading);
          dispatch(getUserProfile());
          dispatch(getJobRequestsDictionary());
        } else {
          errorRef.current?.show();
        }
      }
    );
  };

  const handleShowPin = (response: any) => {
    if (response.status === 201) {
      showPin(true);
      dispatch({ type: ActionsUser.USER_ID, payload: response.data });
    } else {
      errorConnectionRef.current?.show();
    }
  };

  const resendTokenCallback = () =>
    requestSendRepeatCode((userStore as UserStore).userId as string);

  const onRegistration = (values: {
    surname: string;
    name: string;
    patronymic: string;
    phone: string;
    password: string;
    passwordConfirm: string;
  }) => {
    if (dataIsValid) {
      requestRegistrationInspector({
        name: values.name,
        patronymic: values.patronymic,
        surname: values.surname,
        phone: values.phone,
        password: values.password,
        matchingPassword: values.passwordConfirm,
      }).then((response) => {
        handleShowPin(response);
      });
    } else {
      setIsLoading(false);
    }
  };

  const openPrivacy = () => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };

  return (
    <ImageBackground
      source={BackgroundImg}
      resizeMode={'cover'}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={SignUpStyles.signupContainer}>
          <Logo />

          <View style={SignUpStyles.formContainer}>
            <Text style={SignUpStyles.subHeader}>Регистрация</Text>

            <Hr style={{ marginBottom: 16 }} />
            <Formik
              validationSchema={signupValidationSchema}
              initialValues={initialValues}
              onSubmit={(values) => onRegistration(values)}
            >
              {(formikProps) =>
                pin ? (
                  <PinInput
                    length={5}
                    onComplete={handleOnComplete}
                    requestTokenCallback={resendTokenCallback}
                    ref={passwordRef}
                  />
                ) : (
                  <>
                    <Input
                      onBlur={formikProps.handleBlur('surname')}
                      value={formikProps.values.surname}
                      inputStyle={SignUpStyles.input}
                      containerStyle={SignUpStyles.inputContainer}
                      inputContainerStyle={{ borderBottomWidth: 0 }}
                      placeholder={'Фамилия*'}
                      placeholderTextColor={colors.gray}
                      returnKeyType={'next'}
                      onSubmitEditing={() => nameRef.current.focus()}
                      blurOnSubmit={false}
                      errorMessage={
                        formikProps.touched.surname &&
                        formikProps.errors.surname
                          ? formikProps.errors.surname
                          : ''
                      }
                      disabled={isLoading}
                      onChangeText={formikProps.handleChange('surname')}
                    />
                    <Input
                      onBlur={formikProps.handleBlur('name')}
                      ref={nameRef}
                      value={formikProps.values.name}
                      inputStyle={SignUpStyles.input}
                      containerStyle={SignUpStyles.inputContainer}
                      inputContainerStyle={{ borderBottomWidth: 0 }}
                      placeholder={'Имя*'}
                      placeholderTextColor={colors.gray}
                      returnKeyType={'next'}
                      onSubmitEditing={() => patronymicRef.current.focus()}
                      blurOnSubmit={false}
                      errorMessage={
                        formikProps.touched.name && formikProps.errors.name
                          ? formikProps.errors.name
                          : ''
                      }
                      onChangeText={formikProps.handleChange('name')}
                      disabled={isLoading}
                    />
                    <Input
                      onBlur={formikProps.handleBlur('patronymic')}
                      ref={patronymicRef}
                      value={formikProps.values.patronymic}
                      inputStyle={SignUpStyles.input}
                      containerStyle={SignUpStyles.inputContainer}
                      inputContainerStyle={{ borderBottomWidth: 0 }}
                      placeholder={'Отчество*'}
                      placeholderTextColor={colors.gray}
                      returnKeyType={'next'}
                      onSubmitEditing={() => phoneRef.current.focus()}
                      blurOnSubmit={false}
                      errorMessage={
                        formikProps.touched.patronymic &&
                        formikProps.errors.patronymic
                          ? formikProps.errors.patronymic
                          : ''
                      }
                      disabled={isLoading}
                      onChangeText={formikProps.handleChange('patronymic')}
                    />
                    <Input
                      onBlur={formikProps.handleBlur('phone')}
                      ref={phoneRef}
                      value={formikProps.values.phone}
                      inputStyle={SignUpStyles.input}
                      containerStyle={SignUpStyles.inputContainer}
                      inputContainerStyle={{ borderBottomWidth: 0 }}
                      placeholder={'Телефон*'}
                      placeholderTextColor={colors.gray}
                      keyboardType={'phone-pad'}
                      returnKeyType={'next'}
                      onSubmitEditing={() => passwordRef.current.focus()}
                      blurOnSubmit={false}
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
                      disabled={isLoading}
                    />
                    <Input
                      onChangeText={formikProps.handleChange('password')}
                      onBlur={formikProps.handleBlur('password')}
                      value={formikProps.values.password}
                      secureTextEntry={hidePassword}
                      inputStyle={SignUpStyles.input}
                      containerStyle={SignUpStyles.inputContainer}
                      inputContainerStyle={{ borderBottomWidth: 0 }}
                      placeholder={'Пароль*'}
                      returnKeyType={'next'}
                      onSubmitEditing={() => passwordConfirmRef.current.focus()}
                      placeholderTextColor={colors.gray}
                      ref={passwordRef}
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
                      disabled={isLoading}
                    />
                    <Input
                      onChangeText={formikProps.handleChange('passwordConfirm')}
                      onBlur={formikProps.handleBlur('passwordConfirm')}
                      value={formikProps.values.passwordConfirm}
                      secureTextEntry={hidePasswordConfirm}
                      inputStyle={SignUpStyles.input}
                      containerStyle={SignUpStyles.inputContainer}
                      inputContainerStyle={{ borderBottomWidth: 0 }}
                      placeholder={'Подтверждение пароля*'}
                      placeholderTextColor={colors.gray}
                      ref={passwordConfirmRef}
                      rightIcon={
                        <Icon
                          type={'octicon'}
                          name={hidePasswordConfirm ? 'eye-closed' : 'eye'}
                          color={colors.middleGray}
                          onPress={() =>
                            setHidePasswordConfirm(!hidePasswordConfirm)
                          }
                          size={28}
                          iconStyle={{
                            color: !hidePasswordConfirm
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
                        formikProps.touched.passwordConfirm &&
                        formikProps.errors.passwordConfirm
                          ? formikProps.errors.passwordConfirm
                          : ''
                      }
                      disabled={isLoading}
                    />
                    <View style={{ marginTop: 5 }}>
                      <Text style={SignUpStyles.agreementText}>
                        Нажимая на кнопку вы соглашаетесь с
                      </Text>
                      <TouchableOpacity onPressIn={() => openPrivacy()}>
                        <Text
                          style={{
                            ...SignUpStyles.agreementText,
                            color: colors.blue,
                          }}
                        >
                          Политикой конфиденциальности и
                        </Text>
                        <Text
                          style={{
                            ...SignUpStyles.agreementText,
                            color: colors.blue,
                          }}
                        >
                          обработкой персональных данных
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <Button
                      buttonStyle={SignUpStyles.registrationBtn}
                      onPress={() => {
                        setDataIsValid(formikProps.isValid);
                        formikProps.handleSubmit();
                      }}
                      title="Зарегистрироваться"
                      disabled={
                        !(formikProps.isValid && formikProps.dirty) || isLoading
                      }
                      disabledStyle={
                        isLoading && { backgroundColor: colors.blue }
                      }
                      loading={isLoading}
                    />
                  </>
                )
              }
            </Formik>
            <Hr
              style={{
                marginTop: 20,
              }}
            />
            <TextButton
              text="Уже зарегистрированы?"
              onPress={() => {
                navigation.navigate('Login');
              }}
            />
          </View>
        </View>
      </ScrollView>
      <Popup
        ref={errorRef}
        message={'Не верный код подтверждения! Попробуйте еще раз.'}
        type={PopUpTypeConstants.ERROR}
      />

      <Popup
        ref={errorConnectionRef}
        message={'Ошибка соединения! Попробуйте еще раз.'}
        type={PopUpTypeConstants.WARNING}
      />
    </ImageBackground>
  );
};
