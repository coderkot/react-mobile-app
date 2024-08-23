import { Action, Dispatch } from 'redux';

import { JobRequestsService } from '../../../services/job-requests-service';
import { Job } from '../../../types/job';
import { JobRequestsActionTypes } from './job-requests-types';

interface RespondOnCurrentJobActionType
  extends Action<JobRequestsActionTypes.RespondOnCurrentJob> {}

interface RespondOnCurrentJobActionSuccessType
  extends Action<JobRequestsActionTypes.RespondOnCurrentJobSuccess> {
  payload: Job;
}

interface RespondOnCurrentJobActionFailureType
  extends Action<JobRequestsActionTypes.RespondOnCurrentJobFailure> {
  payload: string;
}

export type RespondOnCurrentJobActionTypes =
  | RespondOnCurrentJobActionType
  | RespondOnCurrentJobActionSuccessType
  | RespondOnCurrentJobActionFailureType;

export const respondOnCurrentJob = (id: string) => {
  return async (dispatch: Dispatch<RespondOnCurrentJobActionTypes>) => {
    try {
      dispatch({ type: JobRequestsActionTypes.RespondOnCurrentJob });

      const service: JobRequestsService = new JobRequestsService();
      const job = await service.respondOnCurrentJobsAsync(id);

      dispatch({
        type: JobRequestsActionTypes.RespondOnCurrentJobSuccess,
        payload: job,
      });
    } catch (e) {
      dispatch({
        type: JobRequestsActionTypes.RespondOnCurrentJobFailure,
        payload: (e as Error).message,
      });
    }
  };
};
