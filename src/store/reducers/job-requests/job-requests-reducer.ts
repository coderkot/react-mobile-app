import { GetAllJobsActionTypes } from '../../actions/job-requests/get-all-jobs';
import { JobRequestsActionTypes } from '../../actions/job-requests/job-requests-types';
import { RespondOnCurrentJobActionTypes } from '../../actions/job-requests/respond-on-current-job';
import { JobRequestState } from './types/job-requests-state';

const initialState: JobRequestState = {
  jobs: [],
  jobRequestsScreenData: {
    error: null,
    isLoading: false,
  },
  jobRequestDetailScreenData: {
    error: null,
    isLoading: false,
  },
};

export const jobRequestsReducer = (
  state = initialState,
  action: GetAllJobsActionTypes | RespondOnCurrentJobActionTypes
): JobRequestState => {
  switch (action.type) {
    case JobRequestsActionTypes.GetAllJobs:
      return {
        ...state,
        jobRequestsScreenData: {
          error: null,
          isLoading: true,
        },
      };
    case JobRequestsActionTypes.GetAllJobsSuccess:
      return {
        ...state,
        jobRequestsScreenData: {
          error: null,
          isLoading: false,
        },
        jobs: action.payload,
      };
    case JobRequestsActionTypes.GetAllJobsFailure:
      return {
        ...state,
        jobRequestsScreenData: {
          error: action.payload,
          isLoading: false,
        },
        jobs: [],
      };

    case JobRequestsActionTypes.RespondOnCurrentJob:
      return {
        ...state,
        jobRequestDetailScreenData: {
          isLoading: true,
          error: null,
        },
      };

    case JobRequestsActionTypes.RespondOnCurrentJobSuccess:
      return {
        ...state,
        jobRequestDetailScreenData: {
          isLoading: false,
          error: null,
        },
        jobs: state.jobs.map(p => {
          if (p.id === action.payload.id) {
            return { ...p, wasRespond: p.wasRespond };
          }

          return p;
        }),
      };

    case JobRequestsActionTypes.RespondOnCurrentJobFailure:
      return {
        ...state,
        jobRequestDetailScreenData: {
          isLoading: false,
          error: action.payload,
        },
      };
    default:
      return state;
  }
};
