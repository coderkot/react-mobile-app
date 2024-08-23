import { delay } from '../utils/utils';
import { Job } from '../types/job';
import { fakeJobs } from './fake-data/fake-jobs';

export class JobRequestsService {
  async getAllJobsAsync(): Promise<Job[]> {
    return fakeJobs;
  }

  async respondOnCurrentJobsAsync(id: string): Promise<Job> {
    const job = fakeJobs.find((item) => item.id === id);

    if (job) {
      job.wasRespond = true;
    } else {
      throw new Error('Произошла ошибка во время отклика');
    }

    return { ...job };
  }
}
