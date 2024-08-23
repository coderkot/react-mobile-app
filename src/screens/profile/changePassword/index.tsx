import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import { PersonalDataStyles } from '../personal-data/styles';
import { Formik } from 'formik';
import { validationChangePasswordSchema } from './validation';
import { Button, Icon, Input } from 'react-native-elements';
import { TextButton } from '../../../components/common/text-button';
import { requestChangePassword } from '../../../server/requests';
import { AlertError } from '../../../components/common/alert-error/alert-error';
import { colors, MainStyles } from '../../../main-styles';

export const ChangePassword: React.FC<ChangePasswordProps> = (props) => {
  const newPasswordRef = useRef<any>();
  const newPasswordConfirmRef = useRef<any>();
  const [hideOldPass, setHideOldPass] = useState(true);
  const [hideNewPass, setHideNewPass] = useState(true);
  const [hideNewConfirmPass, setHideNewConfirmPass] = useState(true);

  return (
    <View style={{ width: '100%' }}>
      <Formik
        validationSchema={validationChangePasswordSchema}
        initialValues={{
          passwordNew: '',
          passwordConfirm: '',
          passwordOld: '',
        }}
        onSubmit={(values) => {
          requestChangePassword(
            values.passwordConfirm,
            values.passwordNew,
            values.passwordOld
          ).then((response) => {
            if (response.status == 200) {
              props.callback();
            } else {
              AlertError.error('Ошибка при смене пароля');
            }
          });
        }}
      >
        {(formikProps) => (
          <View style={{ paddingTop: 16 }}>
            <Input
              onChangeText={formikProps.handleChange('passwordOld')}
              onBlur={formikProps.handleBlur('passwordOld')}
              value={formikProps.values.passwordOld}
              inputStyle={PersonalDataStyles.personalDataInput}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              placeholder={'Старый пароль'}
              placeholderTextColor={colors.gray}
              returnKeyType={'next'}
              blurOnSubmit={false}
              errorMessage={
                formikProps.touched.passwordOld &&
                formikProps.errors.passwordOld
                  ? formikProps.errors.passwordOld
                  : ''
              }
              onSubmitEditing={() => newPasswordRef.current.focus()}
              secureTextEntry={hideOldPass}
              rightIcon={
                <Icon
                  type={'octicon'}
                  name={hideOldPass ? 'eye-closed' : 'eye'}
                  color={colors.middleGray}
                  onPress={() => setHideOldPass(!hideOldPass)}
                  size={28}
                  iconStyle={{
                    color: !hideOldPass ? colors.blue : colors.middleGray,
                  }}
                />
              }
              rightIconContainerStyle={{
                position: 'absolute',
                right: 16,
              }}
            />

            <Input
              ref={newPasswordRef}
              onChangeText={formikProps.handleChange('passwordNew')}
              onBlur={formikProps.handleBlur('passwordNew')}
              value={formikProps.values.passwordNew}
              inputStyle={PersonalDataStyles.personalDataInput}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              placeholder={'Новый пароль'}
              placeholderTextColor={colors.gray}
              returnKeyType={'next'}
              blurOnSubmit={false}
              errorMessage={
                formikProps.touched.passwordNew &&
                formikProps.errors.passwordNew
                  ? formikProps.errors.passwordNew
                  : ''
              }
              secureTextEntry={hideNewPass}
              rightIcon={
                <Icon
                  type={'octicon'}
                  name={hideNewPass ? 'eye-closed' : 'eye'}
                  color={colors.middleGray}
                  onPress={() => setHideNewPass(!hideNewPass)}
                  size={28}
                  iconStyle={{
                    color: !hideNewPass ? colors.blue : colors.middleGray,
                  }}
                />
              }
              rightIconContainerStyle={{
                position: 'absolute',
                right: 16,
              }}
              onSubmitEditing={() => newPasswordConfirmRef.current.focus()}
            />
            <Input
              ref={newPasswordConfirmRef}
              onChangeText={formikProps.handleChange('passwordConfirm')}
              onBlur={formikProps.handleBlur('passwordConfirm')}
              value={formikProps.values.passwordConfirm}
              inputStyle={PersonalDataStyles.personalDataInput}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              placeholder={'Подтверждение пароля'}
              placeholderTextColor={colors.gray}
              returnKeyType={'done'}
              blurOnSubmit={false}
              errorMessage={
                formikProps.touched.passwordConfirm &&
                formikProps.errors.passwordConfirm
                  ? formikProps.errors.passwordConfirm
                  : ''
              }
              secureTextEntry={hideNewConfirmPass}
              rightIcon={
                <Icon
                  type={'octicon'}
                  name={hideNewConfirmPass ? 'eye-closed' : 'eye'}
                  color={colors.middleGray}
                  onPress={() => setHideNewConfirmPass(!hideNewConfirmPass)}
                  size={28}
                  iconStyle={{
                    color: !hideNewConfirmPass
                      ? colors.blue
                      : colors.middleGray,
                  }}
                />
              }
              rightIconContainerStyle={{
                position: 'absolute',
                right: 16,
              }}
              onSubmitEditing={() => newPasswordConfirmRef.current.blur()}
            />
            <View style={PersonalDataStyles.buttonForm}>
              <Button
                buttonStyle={{ ...MainStyles.defaultButtonStyle, width: 200 }}
                onPress={() => {
                  formikProps.handleSubmit();
                }}
                title={'Подтвердить'}
              />
              <TextButton text={'Отмена'} onPress={() => props.close()} />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

interface ChangePasswordProps {
  callback: Function;
  close: Function;
}
