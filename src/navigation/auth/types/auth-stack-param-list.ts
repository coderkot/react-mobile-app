export type AuthStackParamList = {
  SmsCode: { phone: string };
  Recovery: { phone: string };
  Login: undefined;
  Registration: undefined;
  Reset: { phone: string };
};
