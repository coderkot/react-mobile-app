import { Job } from '../../../../types/job';
import { JobRequestDetailScreenData } from './job-request-detail-screen-data';
import { JobRequestsScreenData } from './job-requests-screen-data';

export interface JobRequestState {
  jobs: Job[];
  jobRequestsScreenData: JobRequestsScreenData;
  jobRequestDetailScreenData: JobRequestDetailScreenData;
}
