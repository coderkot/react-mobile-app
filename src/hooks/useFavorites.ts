import { TreeNodeModel, UserProfileModel } from '../server/models/models';
import {
  requestAddFavoriteFiles,
  requestDeleteFavorite,
} from '../server/requests';
import { getUserProfile } from '../redux/thunks';
import { ActionsService } from '../redux/actions';
import { PopUpTypeConstants } from '../constants/type-constants';
import { useDispatch } from 'react-redux';

export function useFavorites(profile: UserProfileModel) {
  const dispatch = useDispatch();
  const userId = profile?.id?.toString();

  const addInFavorite = (item: TreeNodeModel) => {
    if (userId) {
      requestAddFavoriteFiles(item.id, userId).then((response) => {
        if (response.status === 204) {
          dispatch(getUserProfile());
        } else {
          dispatch({
            type: ActionsService.SHOW_POPUP,
            payload: {
              message: 'Не удалось добавить в избранное',
              type: PopUpTypeConstants.ERROR,
            },
          });
        }
      });
    }
  };

  const deleteFromFavorite = (item: TreeNodeModel, callback?: Function) => {
    if (userId) {
      requestDeleteFavorite(Number(item.id), userId).then((response) => {
        if (response.status == 204) {
          callback && callback();
          dispatch(getUserProfile());
        } else {
          dispatch({
            type: ActionsService.SHOW_POPUP,
            payload: {
              message: 'Не удалось удалить документ',
              type: PopUpTypeConstants.ERROR,
            },
          });
        }
      });
    }
  };

  return { addInFavorite, deleteFromFavorite };
}
