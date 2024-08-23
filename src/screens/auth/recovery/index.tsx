import React, { useRef, useState } from 'react';
import { Formik } from 'formik';
import { ImageBackground, Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { Hr } from '../../../components/common/hr';
import { Logo } from '../../../components/common/logo';
import { TextButton } from '../../../components/common/text-button';
import { recoveryValidationSchema } from '../validators';
import { RecoveryStyles } from './styles';
import { colors } from '../../../main-styles';
import {
  generateUserPasswordToken,
  resetUserPassword,
} from '../../../server/requests';
import { PinInput } from '../../../components/PinInput/PinInput';
import { AlertError } from '../../../components/common/alert-error/alert-error';
import { ErrorTitleConstants } from '../../../constants/errors-constant';
import { useNavigation, useRoute } from '@react-navigation/native';
import { applyPhoneMask } from '../../../utils/utils';
import BackgroundImg from '../../../assets/images/screen-background.png';
import { KeyBoardScrollView } from '../../../components/KeyBoardScrollView';

export const RecoveryScreen = () => {
  const passwordRef = useRef<any>();
  const navigation = useNavigation();
  const route = useRoute();
  const [pin, showPin] = useState(false);
  const [login, setLogin] = useState<string>('');

  const requestToken = (value: string) => {
    generateUserPasswordToken(value).then((response) => {
      if (response?.status === 200) {
        setLogin(value);
        showPin(!pin);
      } else {
        AlertError.error(
          response?.status === 400
            ? ErrorTitleConstants.USER_NOT_FOUND
            : ErrorTitleConstants.CONNECTION_ERROR
        );
      }
    });
  };

  const generateTokenCallback = () => generateUserPasswordToken(login);

  const resetPassword = (value: string) => {
    resetUserPassword(login, value).then((response) => {
      if (response?.status === 200) {
        navigation.navigate('Login');
      } else {
        AlertError.error(
          response?.status === 400
            ? ErrorTitleConstants.PASSWORD_NOT_RESET
            : ErrorTitleConstants.CONNECTION_ERROR
        );
        passwordRef.current?.clear();
      }
    });
  };

  const canContinue = (isValid: boolean, dirty: boolean): boolean => {
    if (route?.params?.phone) {
      return !isValid;
    }

    return !(isValid && dirty);
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
      <View>
        <View style={RecoveryStyles.loginContainer}>
          <Logo showTitle={true} />
          <Formik
            validationSchema={recoveryValidationSchema}
            initialValues={{ phone: route?.params?.phone }}
            onSubmit={(values) => requestToken(values.phone)}
          >
            {(formikProps) => (
              <View style={RecoveryStyles.formContainer}>
                <Text style={RecoveryStyles.subHeader}>
                  Восстановление пароля
                </Text>
                <Hr
                  style={{
                    marginBottom: 30,
                  }}
                />
                <KeyBoardScrollView offset={200}>
                  <View style={RecoveryStyles.phoneView}>
                    {pin ? (
                      <PinInput
                        length={5}
                        onComplete={resetPassword}
                        requestTokenCallback={generateTokenCallback}
                        ref={passwordRef}
                      />
                    ) : (
                      <>
                        <Input
                          errorMessage={
                            formikProps.touched.phone &&
                            formikProps.errors.phone
                              ? formikProps.errors.phone
                              : ''
                          }
                          onBlur={formikProps.handleBlur('phone')}
                          value={formikProps.values.phone}
                          containerStyle={
                            RecoveryStyles.phoneTextBoxContainerStyle
                          }
                          inputContainerStyle={{ borderBottomWidth: 0 }}
                          style={RecoveryStyles.input}
                          placeholder={'Телефон'}
                          placeholderTextColor={colors.gray}
                          keyboardType={'phone-pad'}
                          onChangeText={(number) => {
                            formikProps.setFieldValue(
                              'phone',
                              applyPhoneMask(number)
                            );
                          }}
                        />
                        <Button
                          buttonStyle={RecoveryStyles.button}
                          onPress={() => {
                            formikProps.handleSubmit();
                          }}
                          title="Восстановить пароль"
                          disabled={canContinue(
                            formikProps.isValid,
                            formikProps.dirty
                          )}
                        />
                        <TextButton
                          text="Отмена"
                          onPress={() => {
                            navigation.goBack();
                          }}
                        />
                      </>
                    )}
                  </View>
                </KeyBoardScrollView>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </ImageBackground>
  );
};
