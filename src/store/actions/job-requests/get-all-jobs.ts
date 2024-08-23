import { Action, Dispatch } from 'redux';

import { JobRequestsService } from '../../../services/job-requests-service';
import { Job } from '../../../types/job';
import { JobRequestsActionTypes } from './job-requests-types';

interface GetAllJobsActionType
  extends Action<JobRequestsActionTypes.GetAllJobs> {}

interface GetAllJobsActionSuccessType
  extends Action<JobRequestsActionTypes.GetAllJobsSuccess> {
  payload: Job[];
}

interface GetAllJobsActionFailureType
  extends Action<JobRequestsActionTypes.GetAllJobsFailure> {
  payload: string;
}

export type GetAllJobsActionTypes =
  | GetAllJobsActionType
  | GetAllJobsActionSuccessType
  | GetAllJobsActionFailureType;

export const getAllJobs = () => {
  return async (dispatch: Dispatch<GetAllJobsActionTypes>) => {
    try {
      dispatch({ type: JobRequestsActionTypes.GetAllJobs });

      const service: JobRequestsService = new JobRequestsService();
      const jobs = await service.getAllJobsAsync();

      dispatch({
        type: JobRequestsActionTypes.GetAllJobsSuccess,
        payload: jobs,
      });
    } catch (e) {
      dispatch({
        type: JobRequestsActionTypes.GetAllJobsFailure,
        payload: (e as Error).message,
      });
    }
  };
};
