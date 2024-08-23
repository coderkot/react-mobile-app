import { AuthActionTypes } from '../../actions/auth/auth-action-types';
import { CheckSmsCodeActionTypes } from '../../actions/auth/check-sms-code';
import { LoginActionTypes } from '../../actions/auth/login-action';
import { RegisterActionTypes } from '../../actions/auth/register-action';
import { ResetPasswordActionTypes } from '../../actions/auth/reset-password-action';
import { AuthState } from './types/auth-state';

const initialState: AuthState = {
  loginScreenData: {
    error: null,
    isLoading: false,
  },
  registrationScreenData: {
    error: null,
    isLoading: false,
  },
  smsCodeScreenData: {
    error: null,
    isLoading: false,
    canResetPassword: false,
  },
  resetScreenData: {
    error: null,
    isLoading: false,
  },
  currentUser: null,
};

export const authReducer = (
  state = initialState,
  action:
    | LoginActionTypes
    | RegisterActionTypes
    | CheckSmsCodeActionTypes
    | ResetPasswordActionTypes
): AuthState => {
  switch (action.type) {
    case AuthActionTypes.Login:
      return {
        ...state,
        loginScreenData: {
          ...state.loginScreenData,
          isLoading: true,
          error: null,
        },
      };
    case AuthActionTypes.LoginSuccess:
      return {
        ...state,
        loginScreenData: {
          ...state.loginScreenData,
          isLoading: false,
          error: null,
        },
        currentUser: action.payload,
      };
    case AuthActionTypes.LoginFailure:
      return {
        ...state,
        loginScreenData: {
          ...state.loginScreenData,
          isLoading: false,
          error: action.payload,
        },
        currentUser: null,
      };
    case AuthActionTypes.Register:
      return {
        ...state,
        registrationScreenData: {
          ...state.registrationScreenData,
          isLoading: true,
          error: null,
        },
      };
    case AuthActionTypes.RegisterSuccess:
      return {
        ...state,
        registrationScreenData: {
          ...state.registrationScreenData,
          isLoading: false,
          error: null,
        },
        currentUser: action.payload,
      };
    case AuthActionTypes.RegisterFailure:
      return {
        ...state,
        registrationScreenData: {
          ...state.registrationScreenData,
          isLoading: false,
          error: action.payload,
        },
        currentUser: null,
      };
    case AuthActionTypes.CheckSmsCode:
      return {
        ...state,
        smsCodeScreenData: {
          ...state.smsCodeScreenData,
          isLoading: true,
          canResetPassword: false,
          error: null,
        },
      };
    case AuthActionTypes.CheckSmsCodeSuccess:
      return {
        ...state,
        smsCodeScreenData: {
          ...state.smsCodeScreenData,
          isLoading: false,
          canResetPassword: true,
          error: null,
        },
      };
    case AuthActionTypes.CheckSmsCodeFailure:
      return {
        ...state,
        smsCodeScreenData: {
          ...state.smsCodeScreenData,
          isLoading: false,
          canResetPassword: false,
          error: action.payload,
        },
      };

    case AuthActionTypes.ResetPassword:
      return {
        ...state,
        resetScreenData: {
          ...state.resetScreenData,
          isLoading: true,
          error: null,
        },
      };
    case AuthActionTypes.ResetPasswordSuccess:
      return {
        ...state,
        resetScreenData: {
          ...state.resetScreenData,
          isLoading: false,
          error: null,
        },
        currentUser: action.payload,
      };
    case AuthActionTypes.ResetPasswordFailure:
      return {
        ...state,
        resetScreenData: {
          ...state.resetScreenData,
          isLoading: false,
          error: action.payload,
        },
        currentUser: null,
      };
    default:
      return state;
  }
};
