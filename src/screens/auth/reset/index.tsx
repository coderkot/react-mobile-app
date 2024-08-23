import React, { useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Formik, FormikErrors, FormikTouched } from 'formik';
import { Button } from 'react-native-elements';
// import KeyboardSpacer from 'react-native-keyboard-spacer';
import { useDispatch, useSelector } from 'react-redux';
import { AlertError } from '../../../components/common/alert-error/alert-error';
import { Hr } from '../../../components/common/hr';
// import { KeyboardContainer } from '../../../components/common/keyboard-container/keyboard-container';
import { Logo } from '../../../components/common/logo';
import { TextBox } from '../../../components/common/text-box';
import { AuthStackParamList } from '../../../navigation/auth/types/auth-stack-param-list';
import { resetPassword } from '../../../store/actions/auth/reset-password-action';
import { RootState } from '../../../store/reducers';
import { resetPasswordValidationSchema } from '../validators';
import { styles } from './styles';

export const ResetScreen = ({
  route,
}: StackScreenProps<AuthStackParamList, 'Reset'>) => {
  const phone = route.params.phone;
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(
    (state: RootState) => state.auth.resetScreenData
  );

  const onRegistration = (values: {
    password: string;
    confirmPassword: string;
  }) => {
    dispatch(resetPassword(phone, values.password));
  };

  useEffect(() => {
    if (error) {
      AlertError.error(error);
    }
  }, [error]);

  return (
    // <KeyboardContainer>
    <ScrollView>
      <View style={styles.loginContainer}>
        <Logo />
        <Text style={styles.subHeader}>Сброс пароля</Text>

        <Hr
          style={{
            marginBottom: 30,
          }}
        />
        <Formik
          validationSchema={resetPasswordValidationSchema}
          initialValues={{ password: '', confirmPassword: '' }}
          onSubmit={(values) => onRegistration(values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
            touched,
            dirty,
          }) => (
            <>
              <TextBox
                disabled={isLoading}
                name="password"
                placeholder="Пароль"
                errorMessage={getError(errors, touched, 'password')}
                containerStyle={styles.passwordTextBoxContainerStyle}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry={true}
              />
              <TextBox
                disabled={isLoading}
                name="confirmPassword"
                placeholder="Подтверждение пароля"
                errorMessage={getError(errors, touched, 'confirmPassword')}
                containerStyle={styles.passwordTextBoxContainerStyle}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                secureTextEntry={true}
              />
              <Button
                buttonStyle={styles.registrationBtn}
                onPress={() => {
                  handleSubmit();
                }}
                loading={isLoading}
                title="Подтвердить"
                disabled={!(isValid && dirty) || isLoading}
              />
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
    //   <KeyboardSpacer />
    // </KeyboardContainer>
  );
};

function getError(
  errors: FormikErrors<{
    password: string;
    confirmPassword: string;
  }>,
  touched: FormikTouched<{
    password: string;
    confirmPassword: string;
  }>,
  field:
    | keyof FormikErrors<{
        password: string;
        confirmPassword: string;
      }>
    | FormikTouched<{
        password: string;
        confirmPassword: string;
      }>
): string {
  if (field === 'password') {
    if (errors.password && touched.password) {
      return errors.password;
    }
  }

  if (field === 'confirmPassword') {
    if (errors.confirmPassword && touched.confirmPassword) {
      return errors.confirmPassword;
    }
  }

  return '';
}
