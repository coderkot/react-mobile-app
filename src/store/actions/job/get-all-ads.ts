import { Action, Dispatch } from 'redux';

import { JobService } from '../../../services/job-service';
import { Ad } from '../../../types/ad';
import { JobActionTypes } from './job-types';

interface GetAllAdsActionType extends Action<JobActionTypes.GetAllAds> {}

interface GetAllAdsActionSuccessType
  extends Action<JobActionTypes.GetAllAdsSuccess> {
  payload: Ad[];
}

interface GetAllAdsActionFailureType
  extends Action<JobActionTypes.GetAllAdsFailure> {
  payload: string;
}

export type GetAllAdsActionTypes =
  | GetAllAdsActionType
  | GetAllAdsActionSuccessType
  | GetAllAdsActionFailureType;

export const getAllAds = () => {
  return async (dispatch: Dispatch<GetAllAdsActionTypes>) => {
    try {
      dispatch({ type: JobActionTypes.GetAllAds });

      const service: JobService = new JobService();
      const ads = await service.getAllAdsAsync();

      dispatch({
        type: JobActionTypes.GetAllAdsSuccess,
        payload: ads,
      });
    } catch (e) {
      dispatch({
        type: JobActionTypes.GetAllAdsFailure,
        payload: (e as Error).message,
      });
    }
  };
};
