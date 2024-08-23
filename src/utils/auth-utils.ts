import { clearAllData } from '../redux/async-storage';
import { logOut } from '../redux/thunks';
import { Dispatch } from 'redux';
import { requestSavePushToken } from '../server/requests';
import { ActionsService } from '../redux/actions';
import { PopUpTypeConstants } from '../constants/type-constants';

export const logoutHandler = (dispatch: Dispatch) => {
  requestSavePushToken(null).then((response) => {
    if (response.status == 204) {
      clearAllData();
      dispatch(logOut());
    } else {
      dispatch({
        type: ActionsService.SHOW_POPUP,
        payload: {
          message: 'Ошибка выхода из системы',
          type: PopUpTypeConstants.ERROR,
        },
      });
    }
  });
};
