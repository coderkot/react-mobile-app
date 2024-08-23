import { Action, Dispatch } from 'redux';

import { AuthService } from '../../../services/auth-service';
import { CurrentUser } from '../../../types/current-user';
import { LoginOrRegisterRequest } from '../../../types/login-or-register-request';
import { AuthActionTypes } from './auth-action-types';

interface RegisterActionType extends Action<AuthActionTypes.Register> {}

interface RegisterActionSuccessType
  extends Action<AuthActionTypes.RegisterSuccess> {
  payload: CurrentUser;
}

interface RegisterActionFailureType
  extends Action<AuthActionTypes.RegisterFailure> {
  payload: string;
}

export type RegisterActionTypes =
  | RegisterActionType
  | RegisterActionSuccessType
  | RegisterActionFailureType;

export const register = (registerRequest: LoginOrRegisterRequest) => {
  return async (dispatch: Dispatch<RegisterActionTypes>) => {
    try {
      dispatch({ type: AuthActionTypes.Register });

      const service: AuthService = new AuthService();
      const currentUser = await service.registerAsync(registerRequest);

      dispatch({
        type: AuthActionTypes.RegisterSuccess,
        payload: currentUser,
      });
    } catch (e) {
      dispatch({
        type: AuthActionTypes.RegisterFailure,
        payload: (e as Error).message,
      });
    }
  };
};
