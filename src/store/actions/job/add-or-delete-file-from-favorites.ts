import { Action, Dispatch } from 'redux';

import { JobService } from '../../../services/job-service';
import { Leaf } from '../../../types/node/leaf';
import { JobActionTypes } from './job-types';

interface AddOrDeleteFileFromFavoritesActionType
  extends Action<JobActionTypes.AddOrDeleteFileFromFavorites> {}

interface AddOrDeleteFileFromFavoritesActionSuccessType
  extends Action<JobActionTypes.AddOrDeleteFileFromFavoritesSuccess> {
  payload: Leaf;
}

interface AddOrDeleteFileFromFavoritesActionFailureType
  extends Action<JobActionTypes.AddOrDeleteFileFromFavoritesFailure> {
  payload: string;
}

export type AddOrDeleteFileFromFavoritesActionTypes =
  | AddOrDeleteFileFromFavoritesActionType
  | AddOrDeleteFileFromFavoritesActionSuccessType
  | AddOrDeleteFileFromFavoritesActionFailureType;

export const addOrDeleteFileFromFavorites = (
  fileId: string,
  isFavorited: boolean
) => {
  return async (
    dispatch: Dispatch<AddOrDeleteFileFromFavoritesActionTypes>
  ) => {
    try {
      dispatch({ type: JobActionTypes.AddOrDeleteFileFromFavorites });

      const service: JobService = new JobService();
      const document = await service.addOrDeleteFileFromFavoritesAsync(
        fileId,
        isFavorited
      );

      dispatch({
        type: JobActionTypes.AddOrDeleteFileFromFavoritesSuccess,
        payload: document,
      });
    } catch (e) {
      dispatch({
        type: JobActionTypes.AddOrDeleteFileFromFavoritesFailure,
        payload: (e as Error).message,
      });
    }
  };
};
