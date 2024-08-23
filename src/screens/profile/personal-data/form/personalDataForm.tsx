import React, { useEffect, useRef, useState } from 'react';
import { PersonalDataStyles } from '../styles';
import { FieldSet } from '../../../../components/common/text-box-field-set';
import { TextBox } from '../../../../components/common/text-box';
import { Icon } from 'react-native-elements';
import { colors } from '../../../../main-styles';
import { applyPhoneMask } from '../../../../utils/utils';
import { View } from 'react-native';
import { useFormikContext } from 'formik';
import { UserProfileModel } from '../../../../server/models/models';
import {
  requestGetTokenChange,
  requestUserUpdateLogin,
  UpdateLoginProps,
} from '../../../../server/requests';
import { useDispatch } from 'react-redux';
import { getUserProfile } from '../../../../redux/thunks';
import { LoginTypes } from '../../../../constants/type-constants';
import { AlertError } from '../../../../components/common/alert-error/alert-error';
import { PinInput } from '../../../../components/PinInput/PinInput';
import { BottomSheet } from '../../../../components/bottom-sheet';
import { ErrorMessages } from '../../../../constants/errors-constant';

export const PersonalDataForm: React.FC<PersonalDataFormProps> = (props) => {
  const formikProps = useFormikContext<any>();
  const [emailIsDisabled, disableEmail] = useState<boolean>(true);
  const [phoneIsDisabled, disablePhone] = useState<boolean>(true);
  const [userData, setUserData] = useState<RequestUserData>();
  const dispatch = useDispatch();
  const pinInputRef = useRef<any>();
  const modalRef = useRef<any>();

  const changeEmailHandler = (error: boolean) => {
    if (!phoneIsDisabled) {
      disablePhone(true);
    }

    if (!error && formikProps.values.email !== props.userProfile.email) {
      if (!emailIsDisabled && formikProps.isValid && formikProps.dirty) {
        requestGetTokenChange(LoginTypes.EMAIL).then((response) => {
          if (response.status == 201) {
            setUserData({
              type: LoginTypes.EMAIL,
              data: { email: formikProps.values.email },
            });
            modalRef.current.open();
          } else {
            AlertError.error('Ошибка при запросе токена');
          }
        });
      }
    }
    disableEmail(!emailIsDisabled);
  };

  const changePhoneHandler = (error: boolean) => {
    if (!emailIsDisabled) {
      disableEmail(true);
    }

    if (!error && formikProps.values.phone !== props.userProfile.phone) {
      if (!phoneIsDisabled && formikProps.isValid && formikProps.dirty) {
        requestGetTokenChange(LoginTypes.PHONE).then((response) => {
          if (response.status == 201) {
            setUserData({
              type: LoginTypes.PHONE,
              data: { phone: formikProps.values.phone },
            });
            modalRef.current.open();
          } else {
            AlertError.error('Ошибка при запросе токена');
          }
        });
      }
    }
    disablePhone(!phoneIsDisabled);
  };

  const resendTokenCallback = () =>
    requestGetTokenChange(userData?.type as LoginTypes);

  const changeLogin = (token: string) => {
    requestUserUpdateLogin(
      userData?.type as LoginTypes,
      token,
      userData?.data as UpdateLoginProps
    ).then((response) => {
      if (response?.status == 200) {
        dispatch(getUserProfile());
        modalRef.current.close();
        AlertError.warning('Смена данных', 'Данные успешно изменены');
      } else {
        pinInputRef.current?.clear();
        const errorMessage =
          response.status === 404 && response.data?.status === 'NOT_FOUND'
            ? ErrorMessages.WRONG_PIN
            : ErrorMessages.ERROR_DATA_UPDATE;
        AlertError.error(errorMessage);
      }
      formikProps.handleSubmit();
    });
  };

  useEffect(() => {
    if (props.userProfile) {
      formikProps.setValues({
        email: (props.userProfile as UserProfileModel).email,
        phone: (props.userProfile as UserProfileModel).phone,
      });
    }
  }, [props.userProfile]);

  return (
    <View
      style={[
        PersonalDataStyles.personalDataContainer,
        PersonalDataStyles.form,
      ]}
    >
      <FieldSet
        placeholder="E-mail"
        labelFieldSetStyle={{ backgroundColor: 'transparent' }}
        textBoxFieldSetContainerStyle={PersonalDataStyles.personalDataField}
      >
        <TextBox
          placeholder="Email"
          value={formikProps.values.email}
          inputStyle={PersonalDataStyles.personalDataInput}
          onChangeText={(text) => {
            formikProps.setFieldValue('email', text.trim());
          }}
          onBlur={formikProps.handleBlur('email')}
          disabled={emailIsDisabled}
          errorMessage={
            formikProps.touched.email && formikProps.errors.email
              ? formikProps.errors.email
              : ''
          }
          rightIcon={
            <Icon
              type={'material'}
              name={emailIsDisabled ? 'edit' : 'check-circle'}
              color={colors.blue}
              containerStyle={{ position: 'absolute', right: 15 }}
              onPress={() => {
                const error = !!(
                  formikProps.touched.email && formikProps.errors.email
                );
                changeEmailHandler(error);
              }}
            />
          }
        />
      </FieldSet>

      <FieldSet
        placeholder="Телефон"
        labelFieldSetStyle={{ backgroundColor: 'transparent' }}
        textBoxFieldSetContainerStyle={PersonalDataStyles.personalDataField}
      >
        <TextBox
          placeholder="Телефон"
          value={formikProps.values.phone}
          inputStyle={PersonalDataStyles.personalDataInput}
          onChangeText={(number) => {
            formikProps.setFieldValue('phone', applyPhoneMask(number));
          }}
          onBlur={formikProps.handleBlur('phone')}
          keyBoardType={'phone-pad'}
          disabled={phoneIsDisabled}
          errorMessage={
            formikProps.touched.phone && formikProps.errors.phone
              ? formikProps.errors.phone
              : ''
          }
          rightIcon={
            <Icon
              type={'material'}
              name={phoneIsDisabled ? 'edit' : 'check-circle'}
              color={colors.blue}
              containerStyle={{ position: 'absolute', right: 15 }}
              onPress={() => {
                const error = !!(
                  formikProps.touched.phone && formikProps.errors.phone
                );
                changePhoneHandler(error);
              }}
            />
          }
        />
      </FieldSet>

      <BottomSheet ref={modalRef} title={'Изменение данных'} height={350}>
        <View style={{ paddingTop: 40 }}>
          <PinInput
            length={5}
            onComplete={changeLogin}
            requestTokenCallback={resendTokenCallback}
            ref={pinInputRef}
          />
        </View>
      </BottomSheet>
    </View>
  );
};

interface PersonalDataFormProps {
  userProfile: UserProfileModel;
}

interface RequestUserData {
  type: LoginTypes;
  data: UpdateLoginProps;
}
