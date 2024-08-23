import { Action, Dispatch } from 'redux';

import { JobService } from '../../../services/job-service';
import { Leaf } from '../../../types/node/leaf';
import { JobActionTypes } from './job-types';

interface GetDocumentsActionType extends Action<JobActionTypes.GetDocuments> {}

interface GetDocumentsActionSuccessType
  extends Action<JobActionTypes.GetDocumentsSuccess> {
  payload: Leaf[];
}

interface GetDocumentsActionFailureType
  extends Action<JobActionTypes.GetDocumentsFailure> {
  payload: string;
}

export type GetDocumentsActionTypes =
  | GetDocumentsActionType
  | GetDocumentsActionSuccessType
  | GetDocumentsActionFailureType;

export const getDocuments = (parentId: string) => {
  return async (dispatch: Dispatch<GetDocumentsActionTypes>) => {
    try {
      dispatch({ type: JobActionTypes.GetDocuments });

      const service: JobService = new JobService();
      const leafs = await service.getDocumentsAsync(parentId);

      dispatch({
        type: JobActionTypes.GetDocumentsSuccess,
        payload: leafs,
      });
    } catch (e) {
      dispatch({
        type: JobActionTypes.GetDocumentsFailure,
        payload: (e as Error).message,
      });
    }
  };
};
