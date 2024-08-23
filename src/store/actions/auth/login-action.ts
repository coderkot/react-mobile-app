import { Action, Dispatch } from 'redux';

import { AuthService } from '../../../services/auth-service';
import { CurrentUser } from '../../../types/current-user';
import { LoginOrRegisterRequest } from '../../../types/login-or-register-request';
import { AuthActionTypes } from './auth-action-types';

interface LoginActionType extends Action<AuthActionTypes.Login> {}

interface LoginActionSuccessType extends Action<AuthActionTypes.LoginSuccess> {
  payload: CurrentUser;
}

interface LoginActionFailureType extends Action<AuthActionTypes.LoginFailure> {
  payload: string;
}

export type LoginActionTypes =
  | LoginActionType
  | LoginActionSuccessType
  | LoginActionFailureType;

export const login = (loginRequest: LoginOrRegisterRequest) => {
  return async (dispatch: Dispatch<LoginActionTypes>) => {
    try {
      dispatch({ type: AuthActionTypes.Login });

      const service: AuthService = new AuthService();
      const currentUser = await service.loginAsync(loginRequest);

      dispatch({
        type: AuthActionTypes.LoginSuccess,
        payload: currentUser,
      });
    } catch (e) {
      dispatch({
        type: AuthActionTypes.LoginFailure,
        payload: (e as Error).message,
      });
    }
  };
};
