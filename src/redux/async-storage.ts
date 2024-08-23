import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoggedIn } from '../constants/text-constants';
import { requestSavePushToken } from '../server/requests';

export const saveLoggedIn = async () => {
  await AsyncStorage.setItem('isLoggedIn', LoggedIn);
};

export const saveUserProfile = async (data: any) => {
  await AsyncStorage.setItem('userProfile', JSON.stringify(data));
};

export const saveUserResume = async (data: any) => {
  await AsyncStorage.setItem('userResume', JSON.stringify(data));
};

export const getStoredUserPushToken = async () => {
  return await AsyncStorage.getItem('pushToken');
};

export const checkAndSavePushToken = async () => {
  const needSavePushToken = await AsyncStorage.getItem('needSavePushToken');
  const token = await AsyncStorage.getItem('pushToken');

  if (needSavePushToken === 'true' && token) {
    requestSavePushToken(token).then((res) => {
      if (res.status === 204) {
        AsyncStorage.setItem('needSavePushToken', '');
      }
    });
  }
};

export const clearAllData = async () => {
  await AsyncStorage.removeItem('isLoggedIn');
  await AsyncStorage.removeItem('userProfile');
  await AsyncStorage.removeItem('userResume');
  await AsyncStorage.removeItem('pushToken');
};
