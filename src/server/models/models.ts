import {
  DocumentTypes,
  NotificationMessageType,
  NotificationTypes,
  ProjectTypes,
  ServerNameRoles,
  StatusTasksTypes,
  TaskTypes,
} from '../../constants/type-constants';
import { RequestStatusTypeConstants } from '../../constants/request-status-constants';
import { Dictionary } from '../../redux/reducers';

export interface EntityModels {
  companyFullName: string;
  taxNumber: string;
  phone?: string;
  email?: string;
  password: string;
  matchingPassword: string;
  notificationType?: NotificationTypes;
}

export interface UserProfileModel {
  companyFullName?: string;
  contactName?: string;
  createdAt?: string;
  email?: string;
  id?: number;
  name?: string;
  patronymic?: string;
  phone?: string;
  photo?: string;
  role: ServerNameRoles | RoleModel;
  surname?: string;
  taxNumber?: string;
  notificationType?: NotificationTypes;
  password?: string;
  matchingPassword?: string;
  favoriteFiles?: Array<TreeNodeModel>;
  resumeId?: number;
  active?: boolean;
  defectsReport?: Array<StatementModel>;
  resume?: UserResumeModel;
  licenses: Array<Licenses>;
}
export interface RoleModel {
  id: 0;
  name: 'string';
  users: Array<any>;
}

export interface UserResumeModel {
  additionally?: string;
  birthDate?: string;
  controlObjects?: Array<Dictionary | number>;
  description?: string;
  experience?: number;
  id?: number;
  createdAt?: string;
  qualificationCertificates?: Array<QualificationCertificateModel | number>;
  qualificationMethods?: Array<QualificationMethodModel | number>;
}

export interface JobRequestsModel {
  controlObject?: DictionaryItem;
  controlMethod?: DictionaryItem;
  controlObjectId?: number;
  controlMethodId?: number;
  createdAt?: string;
  id?: number;
  isFullTime: boolean;
  qualifications?: number | string;
  respondersCount?: number;
  status?: RequestStatusTypeConstants;
  workDescription: string;
  workEnd: string;
  workPlace: string;
  workPrice: number;
  workStart: string;
  isResponded: boolean;
}

export interface TreeNodeModel {
  id: number;
  name: string;
  parentId?: number;
  leaves?: Array<TreeNodeModel>;
  children?: Array<TreeNodeModel>;
  isFavorite?: boolean;
  fileId?: string;
  nodeId?: number;
  type?: DocumentTypes;
  node?: Array<TreeNodeModel>;
  data?: Array<any>;
  category?: string;
}

export interface EntityNews {
  id?: number;
  title: string;
  description: string;
  publicationDate: string;
  shortDescription?: string;
  isPublished?: boolean;
  createdAt?: string;
  prev?: EntityNews;
  next?: EntityNews;
}

export interface DictionaryItem {
  code: string;
  id: 0;
  name: string;
}

export interface QualificationCertificateModel {
  dateIssue?: string;
  id?: number;
  number: number;
}

export interface QualificationMethodModel {
  controlMethodId: string;
  id?: number;
  qualifications: string;
  controlMethod?: Array<Dictionary>;
}

export interface StatementModel {
  id?: number;
  createdAt: string;
  name?: string;
  defects?: Array<DefectModel>;
  controlMethodDescription?: string;
  controlObjectDescription?: string;
  userId?: number;
}

export interface DefectModel {
  id?: number;
  controlObjectDescription?: string;
  address?: string;
  description?: string;
  recommendations: string;
  photoIds?: Array<string>;
  defectsReportId?: StatementModel;
}

export interface AdvertisingModel {
  closeDate: string | Date;
  controlMethod?: Array<Dictionary>;
  controlMethodId?: number;
  createdAt?: string | Date;
  description: string;
  id?: number;
  isPublished: boolean;
  link: string;
  title: string;
}

export interface SupportTaskModel {
  attachments: Array<FileReader>;
  description: string;
  projectType: ProjectTypes;
  taskType: TaskTypes;
  title: string;
  comments?: Array<CommentsModel>;
  createdAt?: string;
  externalId?: string;
  id?: number;
  statusDescription?: string;
  taskStatus?: StatusTasksTypes;
  updatedAt?: string;
  userId?: number;
  status?: StatusTasksTypes;
}

export interface CommentsModel {
  response: boolean;
  comment: string;
}

export interface NotificationModel {
  createdAt: string;
  id: number;
  message: string;
  title: string;
  unread: boolean;
  entityId?: string;
  type?: NotificationMessageType;
  data?: DataNotification;
}
interface DataNotification {
  changeType: string;
  date: string;
  docName: string;
  documentId: string;
  key: NotificationMessageType;
  path: string;
  templateName: string;
  title: string;
  value: string;
  nodeId: string;
}
export interface PagedEntities<T> {
  items: T[];
  itemsCount: number;
  totalCount: number;
}

export interface Licenses {
  id: number;
  active: boolean;
  code: string;
  createdAt: string;
  expirationDate: string;
  expiryDays: number;
  type: LicenseType;
}

export interface LicenseType {
  id: number;
  duration: string;
  name: string;
  price: number;
}
