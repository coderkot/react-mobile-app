export enum AuthActionTypes {
  Login = '[Auth] Login',
  LoginSuccess = '[Auth] Login success',
  LoginFailure = '[Auth] Login failure',

  Register = '[Auth] Register',
  RegisterSuccess = '[Auth] Register success',
  RegisterFailure = '[Auth] Register failure',

  CheckSmsCode = '[Auth] Check sms code',
  CheckSmsCodeSuccess = '[Auth] Check sms code success',
  CheckSmsCodeFailure = '[Auth] Check sms code failure',

  ResetPassword = '[Auth] ResetPassword',
  ResetPasswordSuccess = '[Auth] Reset password success',
  ResetPasswordFailure = '[Auth] Reset password failure',
}
