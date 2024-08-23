import React, { useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Alert, ScrollView, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';

import { AlertError } from '../../../components/common/alert-error/alert-error';
import { BusyIndicator } from '../../../components/common/busy-indicator/busy-indicator';
import { Hr } from '../../../components/common/hr';
import { Logo } from '../../../components/common/logo';
import { AuthStackParamList } from '../../../navigation/auth/types/auth-stack-param-list';
import { checkSmsCode } from '../../../store/actions/auth/check-sms-code';
import { RootState } from '../../../store/reducers';
import { styles } from './styles';

const CELL_COUNT = 5;

export const SmsCodeScreen = ({
  navigation,
  route,
}: StackScreenProps<AuthStackParamList, 'SmsCode'>) => {
  const phone = route.params.phone;
  const [canNavigate, setCanNavigate] = useState(false);
  const [isActive, setIsActive] = useState(true);

  const dispatch = useDispatch();
  const [showSmsBtn, setShowSmsBtn] = useState(false);
  const [value, setValue] = useState('');

  const { isLoading, error, canResetPassword } = useSelector(
    (state: RootState) => state.auth.smsCodeScreenData
  );

  const countDownFinished = () => {
    setTimeout(() => {
      if (!isLoading && isActive) {
        AlertError.warning(
          'Внимание',
          'SMS-код больше не действителен - истек срок действия'
        );
        setValue('');
        setShowSmsBtn(true);
      }
    }, 100);
  };

  useEffect(() => {
    setCanNavigate(canResetPassword);
  }, [canResetPassword]);

  useEffect(() => {
    if (canNavigate) {
      setValue('');
      setIsActive(false);
      setShowSmsBtn(false);
      navigation.navigate('Reset', {
        phone,
      });
    }

    setCanNavigate(false);
  }, [canNavigate]);

  useEffect(() => {
    if (value.length === CELL_COUNT) {
      dispatch(checkSmsCode(phone, value));
    }
  }, [value, phone]);

  useEffect(() => {
    if (error) {
      Alert.alert('Ошибка', error, undefined, {
        cancelable: false,
      });
    }
  }, [error]);

  return (
    <ScrollView>
      <View style={styles.loginContainer}>
        <Logo />
        <Text style={styles.subHeader}>Восстановление пароля</Text>

        <Hr
          style={{
            marginBottom: 30,
          }}
        />
        <>
          <BusyIndicator visible={isLoading}>
            <View style={styles.fieldRow}>
              <Text>Code Field Here</Text>
            </View>
          </BusyIndicator>
          <Hr
            style={{
              marginTop: 30,
              marginBottom: 30,
            }}
          />

          {showSmsBtn ? (
            <Button
              buttonStyle={{
                width: 200,
              }}
              onPress={() => {
                setShowSmsBtn(false);
              }}
              disabled={isLoading}
              loading={isLoading}
              title="Отправить СМС"
            />
          ) : (
            <View style={styles.countDownWrapper}>
              <Text style={styles.countDownText}>Отправить СМС через</Text>
              <Text>Countdown Here!</Text>
            </View>
          )}
        </>
      </View>
    </ScrollView>
  );
};
