import { AppState, Platform } from 'react-native';
import PushNotification, { Importance } from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Buffer } from 'buffer';
import { useEffect } from 'react';
import { requestSavePushToken } from '../../server/requests';

export const PushNotificationService = (onNotificationHandler: Function) => {
  useEffect(() => {
    PushNotification.configure({
      onRegister: async (registerData) => {
        let token = registerData.token;
        if (Platform.OS === 'ios') {
          const buf = new Buffer(token, 'hex');
          token = buf.toString('utf8');
        }
        await AsyncStorage.setItem('pushToken', token);
        requestSavePushToken(token).then((res) => {
          if (res?.status !== 204) {
            AsyncStorage.setItem('needSavePushToken', 'true');
          }
        });
      },
      onNotification: (notification) => {
        notification.finish(PushNotificationIOS.FetchResult.NoData);
        if (AppState.currentState !== 'active') {
          onNotificationHandler();
        }
      },
      onRegistrationError: (error) => console.log(error),
      requestPermissions: true,
      // @ts-ignore
      senderID: '886611637840',
      popInitialNotification: true,
    });

    PushNotification.createChannel(
      {
        channelId: '886611637840',
        channelName: 'My channel',
        channelDescription: 'A channel to categorise your notifications',
        playSound: true,
        soundName: 'default',
        importance: Importance.HIGH,
        vibrate: true,
      },
      (created) => console.log(`createChannel returned '${created}'`)
    );
  }, []);
};
