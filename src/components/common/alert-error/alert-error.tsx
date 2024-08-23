import { Alert } from 'react-native';

export class AlertError {
  static error(message: string): void {
    Alert.alert('Ошибка', message, undefined, {
      cancelable: false,
    });
  }

  static warning(title: string, message: string): void {
    Alert.alert(title, message, undefined, {
      cancelable: false,
    });
  }
}
