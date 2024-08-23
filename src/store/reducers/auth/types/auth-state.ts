import { CurrentUser } from '../../../../types/current-user';
import { LoginScreenData } from './login-screen-data';
import { RegistrationScreenData } from './registration-screen-data';
import { ResetScreenData } from './reset-screen-data';
import { SmsCodeScreenData } from './sms-code-screen-data';

export interface AuthState {
  currentUser: CurrentUser | null;

  loginScreenData: LoginScreenData;
  registrationScreenData: RegistrationScreenData;
  smsCodeScreenData: SmsCodeScreenData;
  resetScreenData: ResetScreenData;
}
