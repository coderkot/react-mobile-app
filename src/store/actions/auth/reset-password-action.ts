import { Action, Dispatch } from 'redux';

import { AuthService } from '../../../services/auth-service';
import { CurrentUser } from '../../../types/current-user';
import { AuthActionTypes } from './auth-action-types';

interface ResetPasswordActionType
  extends Action<AuthActionTypes.ResetPassword> {}

interface ResetPasswordActionSuccessType
  extends Action<AuthActionTypes.ResetPasswordSuccess> {
  payload: CurrentUser;
}

interface ResetPasswordActionFailureType
  extends Action<AuthActionTypes.ResetPasswordFailure> {
  payload: string;
}

export type ResetPasswordActionTypes =
  | ResetPasswordActionType
  | ResetPasswordActionSuccessType
  | ResetPasswordActionFailureType;

export const resetPassword = (phone: string, password: string) => {
  return async (dispatch: Dispatch<ResetPasswordActionTypes>) => {
    try {
      dispatch({ type: AuthActionTypes.ResetPassword });

      const service: AuthService = new AuthService();
      const currentUser = await service.resetPasswordAsync(phone, password);

      dispatch({
        type: AuthActionTypes.ResetPasswordSuccess,
        payload: currentUser,
      });
    } catch (e) {
      dispatch({
        type: AuthActionTypes.ResetPasswordFailure,
        payload: (e as Error).message,
      });
    }
  };
};
