import { colors } from '../main-styles';
import { ServerNameRoles } from './type-constants';

export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_REQUEST_SIZE = 20;
export const TIME_UPDATE_NOTIFICATION = 180000;
export const DEFAULT_BADGE_COLOR = colors.gray;
export const DEFAULT_NODES_LENGTH = 4;

export enum NotificationSettings {
  NEWS_PUSH = 'NEWS_PUSH',
  NEWS_EMAIL = 'NEWS_EMAIL',

  JOB_APP_PUSH = 'JOB_APP_PUSH',
  JOB_APP_EMAIL = 'JOB_APP_EMAIL',

  DOC_PUSH = 'DOC_PUSH',
  DOC_EMAIL = 'DOC_EMAIL',

  NEW_ANSWER_PUSH = 'NEW_ANSWER_PUSH',
  NEW_ANSWER_EMAIL = 'NEW_ANSWER_EMAIL',
}

export const PushGroup = [
  NotificationSettings.DOC_PUSH,
  NotificationSettings.NEWS_PUSH,
  NotificationSettings.JOB_APP_PUSH,
  NotificationSettings.NEW_ANSWER_PUSH,
];

export const EmailGroup = [
  NotificationSettings.DOC_EMAIL,
  NotificationSettings.NEWS_EMAIL,
  NotificationSettings.JOB_APP_EMAIL,
  NotificationSettings.NEW_ANSWER_EMAIL,
];

export const NOT_MP_PROVIDED_ROLES = [
  ServerNameRoles.ROLE_COMPANY,
  ServerNameRoles.ROLE_ADMIN,
];
