import { Action, Dispatch } from 'redux';

import { AuthService } from '../../../services/auth-service';
import { AuthActionTypes } from './auth-action-types';

interface CheckSmsCodeActionType extends Action<AuthActionTypes.CheckSmsCode> {}

interface CheckSmsCodeActionSuccessType
  extends Action<AuthActionTypes.CheckSmsCodeSuccess> {}

interface CheckSmsCodeActionFailureType
  extends Action<AuthActionTypes.CheckSmsCodeFailure> {
  payload: string;
}

export type CheckSmsCodeActionTypes =
  | CheckSmsCodeActionType
  | CheckSmsCodeActionSuccessType
  | CheckSmsCodeActionFailureType;

export const checkSmsCode = (phone: string, smsCode: string) => {
  return async (dispatch: Dispatch<CheckSmsCodeActionTypes>) => {
    try {
      dispatch({ type: AuthActionTypes.CheckSmsCode });

      const service: AuthService = new AuthService();
      const result = await service.checkSmsCodeAsync(phone, smsCode);

      dispatch({
        type: AuthActionTypes.CheckSmsCodeSuccess,
        payload: result,
      });
    } catch (e) {
      dispatch({
        type: AuthActionTypes.CheckSmsCodeFailure,
        payload: (e as Error).message,
      });
    }
  };
};
