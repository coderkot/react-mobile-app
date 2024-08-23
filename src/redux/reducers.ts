import { combineReducers } from 'redux';
import { ActionsService, ActionsUser, ActionsQuery } from './actions';
import {
  JobRequestsModel,
  NotificationModel,
  PagedEntities,
  SupportTaskModel,
  UserProfileModel,
  UserResumeModel,
} from '../server/models/models';
import { PopUpTypeConstants } from '../constants/type-constants';

const initialUserState: UserStore = {};
const initialServiceState: ServiceStore = {
  offlineMode: false,
};
const initialQueryState: QueryStore = {};

const rootReducer = combineReducers({
  userStore: userReducer,
  serviceStore: serviceReducer,
  queryStore: queryReducer,
});

function userReducer(
  state = initialUserState,
  action: { type: any; payload: any }
) {
  switch (action.type) {
    case ActionsUser.USER_LOGIN: {
      return { ...state, isLoggedIn: action.payload };
    }
    case ActionsUser.USER_ID: {
      return { ...state, userId: action.payload };
    }
    case ActionsUser.USER_PROFILE: {
      return { ...state, userProfile: action.payload };
    }
    case ActionsUser.USER_RESUME: {
      return { ...state, userResume: action.payload };
    }
    case ActionsUser.USER_REQUESTS: {
      return { ...state, jobRequests: action.payload };
    }
    case ActionsUser.USER_QUESTIONS: {
      return { ...state, userQuestions: action.payload };
    }
    case ActionsUser.USER_NOTIFICATIONS: {
      return { ...state, userNotifications: action.payload };
    }
    case ActionsUser.USER_REPORTS: {
      return { ...state, userReports: action.payload };
    }
    default:
      return state;
  }
}

function serviceReducer(
  state = initialServiceState,
  action: { type: any; payload: any }
) {
  switch (action.type) {
    case ActionsService.SHOW_POPUP: {
      return { ...state, messagePopUp: action.payload };
    }
    case ActionsService.CONTROL_METHODS: {
      return { ...state, controlMethods: action.payload };
    }
    case ActionsService.CONTROL_OBJECTS: {
      return { ...state, controlObjects: action.payload };
    }
    case ActionsService.USER_QUALIFICATION: {
      return { ...state, userQualifications: action.payload };
    }
    case ActionsService.OFFLINE_MODE: {
      return { ...state, offlineMode: action.payload };
    }
    case ActionsService.SHOW_LICENSE_REQUIRED: {
      return { ...state, showLicenseRequired: action.payload };
    }
    case ActionsService.OPEN_NOTIFICATION_LIST: {
      return { ...state, openList: action.payload };
    }
    default:
      return state;
  }
}

function queryReducer(
  state = initialQueryState,
  action: { type: any; payload: any }
) {
  switch (action.type) {
    case ActionsQuery.USER_REPORTS_QUERY: {
      return { ...state, queryUserReports: action.payload };
    }
    case ActionsQuery.USER_QUESTIONS_QUERY: {
      return { ...state, queryUserQuestions: action.payload };
    }
    case ActionsQuery.USER_REQUESTS_QUERY: {
      return { ...state, queryJobRequests: action.payload };
    }
    default:
      return state;
  }
}

export interface UserStore {
  isLoggedIn?: boolean;
  userId?: string;
  userProfile?: UserProfileModel;
  userResume?: UserResumeModel;
  jobRequests?: PagedEntities<JobRequestsModel>;
  userQuestions?: PagedEntities<SupportTaskModel>;
  userNotifications?: Array<NotificationModel>;
}

export interface ServiceStore {
  messagePopUp?: MessagePopUp;
  controlMethods?: Array<Dictionary>;
  controlObjects?: Array<Dictionary>;
  userQualifications?: Array<{
    description: string;
    id: number;
  }>;
  offlineMode: boolean;
}

export interface QueryState {
  loading: boolean;
  error?: string;
}

export interface QueryStore {
  queryUserQuestions?: QueryState;
  queryJobRequests?: QueryState;
  queryUserReports?: QueryState;
}

export interface MessagePopUp {
  message: string;
  type: PopUpTypeConstants;
  zone?: string;
}

export interface Dictionary {
  code: string;
  id: number;
  name: string;
  submethods?: Array<Dictionary>;
  children?: Array<Dictionary>;
}

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
