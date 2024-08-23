import axios, { AxiosPromise, AxiosResponse } from 'axios';
import {
  AdvertisingModel,
  EntityModels,
  EntityNews,
  JobRequestsModel,
  PagedEntities,
  QualificationCertificateModel,
  QualificationMethodModel,
  SupportTaskModel,
  UserProfileModel,
  UserResumeModel,
} from './models/models';
import store from '../redux/store';
import { backendApi } from '../constants/backend-api-constants';
import { LoginTypes, NotificationTypes } from '../constants/type-constants';
import { ListParams } from './request-types';
import { getPrefix, wrapperSanitizeHtml } from '../utils/utils';
import { RequestStatusTypeConstants } from '../constants/request-status-constants';
import { Dictionary } from '../redux/reducers';
import moment from 'moment';
import { logOut } from '../redux/thunks';
import { DateFormat } from '../constants/format-constants';
import { ActionsService } from '../redux/actions';

export const baseURL = 'https://top-secret-server.ru/api';

const server = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

server.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response.status;

    if (status == 401) {
      // @ts-ignore
      store.dispatch(logOut());
    }

    if (status == 402) {
      // @ts-ignore
      store.dispatch({
        type: ActionsService.SHOW_LICENSE_REQUIRED,
        payload: true,
      });
    }

    return error.response;
  }
);

export const requestLogin = (login: string, password: string): AxiosPromise => {
  const result = login.replace('+', '%2b');
  const params = new URLSearchParams();
  params.append('username', result);
  params.append('password', password);

  return server.post(backendApi.login, params);
};

export const requestLogout = (): AxiosPromise => {
  return server.post(backendApi.logout);
};

export const requestRegistrationInspector = (
  user: UserProfileModel
): AxiosPromise => {
  return server.post(backendApi.registration, {
    name: user.name,
    patronymic: user.patronymic,
    surname: user.surname,
    phone: user.phone,
    password: user.password,
    matchingPassword: user.matchingPassword,
    notificationType: NotificationTypes.SMS,
  });
};

export const requestRegistrationEntity = (user: EntityModels): AxiosPromise => {
  return server.post(backendApi.registration, {
    companyFullName: user.companyFullName,
    taxNumber: user.taxNumber,
    email: user?.email,
    phone: user?.phone,
    password: user.password,
    matchingPassword: user.matchingPassword,
    notificationType: user.phone
      ? NotificationTypes.SMS
      : NotificationTypes.EMAIL,
  });
};

export const requestSendRepeatCode = (id: string): AxiosPromise => {
  return server.post(`${backendApi.tokenResend}${id}`);
};

export const requestGetUser = (id?: number): AxiosPromise => {
  return server.get(`${backendApi.getUSer}${id}`);
};

export const requestActivateCode = (
  code: string,
  userId?: any
): AxiosPromise => {
  return server.post(`${backendApi.registrationConfirm}${userId}/${code}`);
};

export const generateUserPasswordToken = (login: string): AxiosPromise => {
  const result = login.replace('+', '%2b');
  const params = new URLSearchParams();
  params.append('login', result);

  return server.post(backendApi.generateToken, params);
};

export const requestGetProfile = (): AxiosPromise => {
  return server.get(backendApi.getProfile);
};

export const requestSavePhoto = (image: any): AxiosPromise => {
  const formData = new FormData();
  formData.append('image', {
    uri: image.uri,
    filename: image.fileName,
    name: image.fileName,
    type: image.type,
  });

  return server.post(backendApi.photo, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const requestDeletePhoto = (): AxiosPromise => {
  return server.delete(backendApi.photo);
};

export const requestGetResume = (id: number): AxiosPromise => {
  return server.get(`${backendApi.resume}/${id}`);
};

export const requestCreateResume = (userId: number): AxiosPromise => {
  return server.post(backendApi.resume, {
    additionally: '',
    birthDate: '',
    controlObjects: [],
    description: '',
    experience: 0,
    qualificationCertificates: [],
    qualificationMethods: [],
    userId,
  });
};

export const requestUpdateResume = (resume: UserResumeModel) => {
  // @ts-ignore
  resume.qualificationCertificates = (
    resume.qualificationCertificates as Array<QualificationCertificateModel>
  ).map((item) => item.id);
  // @ts-ignore
  resume.qualificationMethods = (
    resume.qualificationMethods as Array<QualificationMethodModel>
  ).map((item) => item.id);
  resume.controlObjects = (resume.controlObjects as Array<Dictionary>).map(
    (item) => item.id
  );
  resume.birthDate = moment(resume.birthDate).format('YYYY-MM-DD');

  return server.put(backendApi.resume, resume);
};

export const requestAddQualificationCertificate = (
  certificate: QualificationCertificateModel
): AxiosPromise => {
  return server.post(backendApi.qualificationCertificates, certificate);
};

export const requestDeleteQualificationCertificate = (
  id: number
): AxiosPromise => {
  return server.delete(`${backendApi.qualificationCertificates}/${id}`);
};

export const requestAddQualificationMethod = (
  method: QualificationMethodModel
): AxiosPromise => {
  return server.post(backendApi.qualificationMethods, method);
};

export const resetUserPassword = (
  login: string,
  token: string
): AxiosPromise => {
  const result = login.replace('+', '%2b');
  const params = new URLSearchParams();
  params.append('login', result);
  params.append('token', token);

  return server.post(backendApi.passwordReset, params);
};

export const requestChangePassword = (
  confirmPassword: string,
  newPassword: string,
  password: string
): AxiosPromise => {
  return server.post(
    backendApi.changePasswords,
    parseParams({ confirmPassword, newPassword, password })
  );
};

export const requestUserUpdateContactName = (contactName: string) => {
  return server.put(backendApi.userUpdate, {
    contactName: contactName,
  });
};

export const requestUserUpdateLogin = (
  type: LoginTypes,
  token: string,
  data: UpdateLoginProps
) => {
  return server.put(`${backendApi.userUpdate}/${type}/${token}`, data);
};

export const requestGetTokenChange = (type: LoginTypes) => {
  return server.post(`${backendApi.tokenChange}/${type}`);
};

export const requestJobLists = (params: ListParams): AxiosPromise => {
  return server.get(backendApi.jobRequestsLists, {
    params: parseParams(params),
  });
};

export const applyJobApplication = (id: number): AxiosPromise => {
  return server.post(`${backendApi.jobRequestsLists}/${id}/apply`);
};

export const requestJobListsByUserId = (params: ListParams): AxiosPromise => {
  return server.get(backendApi.jobRequestsLists, {
    params: parseParams(params),
  });
};

export const requestJobRequestsById = (id: string): AxiosPromise => {
  return server.get(`${backendApi.jobRequestsLists}/${id}`);
};

export const requestJobRequestUpdate = (
  object: JobRequestsModel
): AxiosPromise => {
  return server.put(backendApi.jobRequestsLists, object);
};

export const requestJobRequestCreate = (
  object: JobRequestsModel
): AxiosPromise => {
  return server.post(backendApi.jobRequestsLists, object);
};

export const requestJobRequestUpdateStatus = (
  id: number,
  status: RequestStatusTypeConstants
): AxiosPromise => {
  return server.put(`${backendApi.jobRequestsLists}/${id}`, { status });
};

export const requestJobRequestDelete = (id: number): AxiosPromise => {
  return server.delete(`${backendApi.jobRequestsLists}/${id}`);
};

export const parseParams = (
  queryParams: any,
  urlSearchParams?: URLSearchParams,
  prefix?: string
): URLSearchParams => {
  const result = urlSearchParams || new URLSearchParams();
  const isArray = Array.isArray(queryParams);

  for (let param in queryParams) {
    if (queryParams.hasOwnProperty(param)) {
      const name = getPrefix(param, isArray, prefix);
      const value = queryParams[param];

      if (value !== null && typeof value === 'object') {
        parseParams(value, result, name);
      } else {
        result.append(name, value);
      }
    }
  }

  return result;
};

export const parseParamsToFormData = (params: any) => {
  const bodyFormData = new FormData();
  for (let param in params) {
    if (Array.isArray(params[param])) {
      params[param].map((item: any) => bodyFormData.append(param, item));
    } else {
      bodyFormData.append(param, params[param]);
    }
  }
  return bodyFormData;
};

export const createNews = (news: EntityNews): AxiosPromise => {
  return server.post(backendApi.news, {
    ...news,
  });
};

export const updateNews = (news: EntityNews): AxiosPromise => {
  return server.put(backendApi.news, {
    ...news,
  });
};

export const getAllNews = (
  params: ListParams
): AxiosPromise<PagedEntities<EntityNews>> => {
  return new Promise<AxiosResponse<PagedEntities<EntityNews>>>((resolve) => {
    server
      .get(backendApi.news, { params: parseParams(params) })
      .then((response) => {
        if (response.status == 200) {
          response.data.items = response.data.items.map((item: EntityNews) => ({
            ...item,
            description: wrapperSanitizeHtml(item.description),
            publicationDate: moment(item.publicationDate).format(
              DateFormat.DEFAULT_FORMAT
            ),
            createdAt: moment(item.createdAt).format(DateFormat.DEFAULT_FORMAT),
          }));
        }

        resolve(response);
      });
  });
};

export const getNews = (id: number): AxiosPromise<EntityNews> => {
  return new Promise<AxiosResponse<EntityNews>>((resolve) => {
    server.get(`${backendApi.news}/${id}`).then((response) => {
      if (response.status == 200) {
        response.data.description = wrapperSanitizeHtml(
          response.data.description
        );
        response.data.publicationDate = moment(
          response.data.publicationDate
        ).format(DateFormat.DEFAULT_FORMAT);
      }

      resolve(response);
    });
  });
};

export const deleteNews = (id: number | undefined): AxiosPromise => {
  return server.delete(`${backendApi.news}/${id}`);
};

export const requestGetControlObjects = (): AxiosPromise => {
  return server.get(backendApi.controlObjects);
};

export const requestGetControlMethods = (): AxiosPromise => {
  return server.get(backendApi.controlMethods);
};

export const requestGetUserQualification = (): AxiosPromise => {
  return server.get(backendApi.userQualification);
};

export const requestGetTreeNodeRoots = (): AxiosPromise => {
  return server.get(backendApi.treeNodeRoots);
};

export const requestGetTreeNodeById = (id: number): AxiosPromise => {
  return server.get(`${backendApi.treeNode}/${id}`);
};

export const requestLoadFileInNode = (
  nodeId: number,
  file: any
): AxiosPromise => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('nodeId', nodeId.toString());

  return server.post(backendApi.files, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const requestDeleteFile = (fileId: string): AxiosPromise => {
  return server.delete(`${backendApi.files}/${fileId}`);
};

export const requestUpdateFile = (id: number, file: any): AxiosPromise => {
  const formData = new FormData();
  formData.append('file', file);

  return server.put(`${backendApi.files}/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const requestGetDocFile = (id: string, nodeId: number): AxiosPromise => {
  return server.get(`${backendApi.filesDoc}/${id}`, {
    params: parseParams({ nodeId }),
  });
};

export const requestGetVideoFile = (
  id: string,
  nodeId: number
): AxiosPromise => {
  return server.get(`${backendApi.filesVideo}/${id}`, {
    params: parseParams({ nodeId }),
  });
};

export const requestAddFavoriteFiles = (
  fileId: number,
  userId: string
): AxiosPromise => {
  return server.put(
    `${backendApi.changeFavoriteFiles.replace('userId', userId)}`,
    parseParams({ fileId })
  );
};

export const requestDeleteFavorite = (
  fileId: number,
  userId: string
): AxiosPromise => {
  const options = {
    method: 'DELETE',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: parseParams({ fileId }),
    url: `${backendApi.changeFavoriteFiles.replace('userId', userId)}`,
  };
  // @ts-ignore
  return server(options);
};

export const requestGetReportsById = (id: number): AxiosPromise => {
  return server.get(`${backendApi.reports}/${id}`);
};

export const requestGetReportList = (params: ListParams): AxiosPromise => {
  return server.get(backendApi.reportList, { params: parseParams(params) });
};

export const requestSaveReports = (statement: any): AxiosPromise => {
  return server.put(backendApi.reports, statement);
};

export const requestGetImages = (id: string) => {
  return server.get(`${backendApi.images}/${id}`);
};

export const requestCreateImages = (image: any) => {
  const formData = new FormData();
  formData.append('image', {
    uri: image.uri,
    filename: image.fileName,
    name: image.fileName,
    type: image.type,
  });

  formData.append('Content-Type', image.type);

  return server.post(backendApi.images, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const requestDeleteImages = (id: string) => {
  return server.delete(`${backendApi.images}/${id}`);
};

export const requestSendReports = (emails: Array<string>, reportId: number) => {
  return server.post(backendApi.reportSend, { emails, reportId });
};

export const requestGetAdvertisingList = (params: ListParams) => {
  return new Promise<AxiosResponse<any>>((resolve) => {
    server
      .get(backendApi.advertising, { params: parseParams(params) })
      .then((response) => {
        response.data.description = wrapperSanitizeHtml(
          response.data.description
        );
        resolve(response);
      });
  });
};

export const requestCreateAdvertising = (advertising: AdvertisingModel) => {
  advertising.description = wrapperSanitizeHtml(advertising.description);
  return server.post(backendApi.advertising, advertising);
};

export const requestUpdateAdvertising = (advertising: AdvertisingModel) => {
  advertising.description = wrapperSanitizeHtml(advertising.description);
  return server.put(backendApi.advertising, advertising);
};

export const requestGetAdvertisingItem = (id: string) => {
  return new Promise<AxiosResponse<any>>((resolve) => {
    server.get(`${backendApi.advertising}/${id}`).then((response) => {
      response.data.description = wrapperSanitizeHtml(
        response.data.description
      );
      resolve(response);
    });
  });
};

export const getSupportTaskById = (id: string) => {
  return server.get(`${backendApi.support}/${id}`);
};

export const getSupportTasks = (params: ListParams) => {
  return server.get(backendApi.support, { params: parseParams(params) });
};

export const createSupportTask = (task: SupportTaskModel) => {
  return server.post(backendApi.support, parseParamsToFormData(task), {
    headers: { 'content-type': 'multipart/form-data' },
  });
};

export const requestSendMessage = (
  id: number,
  comment: string,
  attachments?: Array<any>
) => {
  return server.put(
    backendApi.comment,
    parseParamsToFormData({ id, comment, attachments }),
    { headers: { 'content-type': 'multipart/form-data' } }
  );
};

export const requestNotificationsList = (): AxiosPromise => {
  return server.get(backendApi.notifications);
};

export const requestNotificationById = (id: string): AxiosPromise => {
  return server.get(`${backendApi.notifications}/${id}`);
};

export const requestNotificationMarkRead = (id: string): AxiosPromise => {
  return server.put(`${backendApi.notifications}/${id}`);
};

export const requestNotificationsDelete = () => {
  return server.delete(backendApi.notifications);
};

export const requestNotificationsDeleteRead = () => {
  return server.delete(backendApi.notificationsDeleteRead);
};

export const requestNotificationMarkAllRead = (): AxiosPromise => {
  return server.put(backendApi.notificationsAllRead);
};

export const requestSavePushToken = (token: string | null): AxiosPromise => {
  return server.post(`${backendApi.savePushToken}/${token}`);
};

export const requestGetNotificationSettings = () => {
  return server.get(backendApi.notificationSettings);
};

export const requestUpdateNotificationSettings = (settings: Object) => {
  return server.put(backendApi.notificationSettings, settings);
};

export const requestFavouritesFiles = (params: ListParams): AxiosPromise => {
  return server.get(backendApi.favoriteFiles, { params: parseParams(params) });
};

export interface UpdateLoginProps {
  email?: string;
  phone?: string;
}
