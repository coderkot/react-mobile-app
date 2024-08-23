import { Action, Dispatch } from 'redux';

import { JobService } from '../../../services/job-service';
import { Node } from '../../../types/node/node';
import { JobActionTypes } from './job-types';

interface GetAllNodesActionType extends Action<JobActionTypes.GetAllNodes> {}

interface GetAllNodesActionSuccessType
  extends Action<JobActionTypes.GetAllNodesSuccess> {
  payload: Node[];
}

interface GetAllNodesActionFailureType
  extends Action<JobActionTypes.GetAllNodesFailure> {
  payload: string;
}

export type GetAllNodesActionTypes =
  | GetAllNodesActionType
  | GetAllNodesActionSuccessType
  | GetAllNodesActionFailureType;

export const getAllNodes = () => {
  return async (dispatch: Dispatch<GetAllNodesActionTypes>) => {
    try {
      dispatch({ type: JobActionTypes.GetAllNodes });

      const service: JobService = new JobService();
      const nodes = await service.getAllNodesAsync();

      dispatch({
        type: JobActionTypes.GetAllNodesSuccess,
        payload: nodes,
      });
    } catch (e) {
      dispatch({
        type: JobActionTypes.GetAllNodesFailure,
        payload: (e as Error).message,
      });
    }
  };
};
