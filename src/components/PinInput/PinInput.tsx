import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { AxiosPromise } from 'axios';
import { Button } from 'react-native-elements';
import { View, Text } from 'react-native';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { RecoveryStyles } from '../../screens/auth/recovery/styles';
import { PinInputStyles } from './styles';

export const PinInput = React.forwardRef((props: CustomPinInputProps, ref) => {
  const pinInputRef = useRef<any>();
  const MAX_VALUE_TIMER: number = 60;
  const [timer, setTimer] = useState(MAX_VALUE_TIMER);
  const [code, setCode] = useState<string>();

  useImperativeHandle(ref, () => ({
    clear: () => {
      setCode('');
      pinInputRef.current?.focus();
      pinInputRef.current?.clear();
    },
  }));

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer != 0) {
      interval = setInterval(() => setTimer(timer - 1), 1000);
    }
    return () => clearInterval(interval);
  });

  const handleChangeTimer = () => {
    if (props.requestTokenCallback) {
      props
        .requestTokenCallback()
        .then(() => setTimer(MAX_VALUE_TIMER))
        .catch(() => {
          console.log('Ошибка отправки кода');
        });
    }
  };

  return (
    <View style={PinInputStyles.mainContainer}>
      <SmoothPinCodeInput
        ref={pinInputRef}
        cellStyle={PinInputStyles.pinInput}
        cellStyleFocused={PinInputStyles.pinSelected}
        value={code}
        onTextChange={(value: string) => setCode(value)}
        codeLength={props.length}
        onFulfill={(value: string) => {
          !!props.onComplete && props.onComplete(value);
        }}
      />

      <View style={PinInputStyles.controlContainer}>
        {timer === 0 && (
          <Button
            buttonStyle={RecoveryStyles.button}
            title={'Отправить СМС'}
            onPress={() => handleChangeTimer()}
          />
        )}
        {timer !== 0 && <Text>Отправить СМС через {timer + ' секунд'}</Text>}
      </View>
    </View>
  );
});

interface CustomPinInputProps {
  length: number;
  onComplete?: Function;
  requestTokenCallback?: () => AxiosPromise<any>;
}
