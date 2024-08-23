import { combineReducers } from 'redux';

import { authReducer } from './auth/auth-reducer';
import { educationReducer } from './education/education-reducer';
import { jobRequestsReducer } from './job-requests/job-requests-reducer';
import { jobReducer } from './job/job-reducer';
import { newsReducer } from './news/news-reducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  jobRequests: jobRequestsReducer,
  news: newsReducer,
  education: educationReducer,
  job: jobReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
