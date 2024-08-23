import { Action, Dispatch } from 'redux';

import { JobService } from '../../../services/job-service';
import { Node } from '../../../types/node/node';
import { JobActionTypes } from './job-types';

interface GetSubNodesActionType extends Action<JobActionTypes.GetSubNodes> {}

interface GetSubNodesActionSuccessType
  extends Action<JobActionTypes.GetSubNodesSuccess> {
  payload: Node[];
}

interface GetSubNodesActionFailureType
  extends Action<JobActionTypes.GetSubNodesFailure> {
  payload: string;
}

export type GetSubNodesActionTypes =
  | GetSubNodesActionType
  | GetSubNodesActionSuccessType
  | GetSubNodesActionFailureType;

export const getSubNodesById = (parentId: string) => {
  return async (dispatch: Dispatch<GetSubNodesActionTypes>) => {
    try {
      dispatch({ type: JobActionTypes.GetSubNodes });

      const service: JobService = new JobService();
      const nodes = await service.getSubNodesAsync(parentId);

      dispatch({
        type: JobActionTypes.GetSubNodesSuccess,
        payload: nodes,
      });
    } catch (e) {
      dispatch({
        type: JobActionTypes.GetSubNodesFailure,
        payload: (e as Error).message,
      });
    }
  };
};
