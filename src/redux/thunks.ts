import {
  getSupportTasks,
  requestCreateResume,
  requestGetControlMethods,
  requestGetControlObjects,
  requestGetProfile,
  requestGetReportList,
  requestGetResume,
  requestGetTreeNodeRoots,
  requestGetUserQualification,
  requestJobLists,
  requestLogout,
  requestNotificationsList,
} from '../server/requests';
import { Dispatch } from 'redux';
import { ActionsQuery, ActionsService, ActionsUser } from './actions';
import { SupportTaskModel, TreeNodeModel } from '../server/models/models';
import {
  PopUpTypeConstants,
  ServerNameRoles,
  TreeNodeNames,
} from '../constants/type-constants';
import { ListParams } from '../server/request-types';
import moment from 'moment';
import { DateFormat } from '../constants/format-constants';
import { getErrorObject, sorting } from '../utils/utils';
import { saveUserProfile, saveUserResume } from './async-storage';
import {
  DEFAULT_NODES_LENGTH,
  NOT_MP_PROVIDED_ROLES,
} from '../constants/setting-constants';
import { logoutHandler } from '../utils/auth-utils';
import { ErrorTitleConstants } from '../constants/errors-constant';

export const getUserProfile = () => {
  return (dispatch: Dispatch) => {
    requestGetProfile().then((response) => {
      if (response.status === 200) {
        if (NOT_MP_PROVIDED_ROLES.includes(response.data?.role)) {
          dispatch({
            type: ActionsService.SHOW_POPUP,
            payload: {
              message:
                'На данный момент приложение работает только для дефектоскопистов',
              type: PopUpTypeConstants.WARNING,
            },
          });

          logoutHandler(dispatch);
        } else {
          dispatch({ type: ActionsUser.USER_LOGIN, payload: true });
          dispatch({ type: ActionsUser.USER_PROFILE, payload: response.data });

          saveUserProfile(response.data);

          if (
            response.data.role == ServerNameRoles.ROLE_MASTER ||
            response.data.role == ServerNameRoles.ROLE_PREMIUM_MASTER
          ) {
            // @ts-ignore
            dispatch(getUserResume(response.data.resumeId, response.data.id));
          }
        }
      } else {
        console.log(response);
      }
    });
  };
};

export const getUserResume = (idResume: number, idUser: number) => {
  return (dispatch: Dispatch) => {
    if (idResume) {
      requestGetResume(idResume).then((response) => {
        if (response.status == 200) {
          dispatch({ type: ActionsUser.USER_RESUME, payload: response.data });
          saveUserResume(response.data);
        } else {
          console.log(response);
        }
      });
    } else {
      requestCreateResume(idUser).then((response) => {
        if (response.status == 201) {
          // @ts-ignore
          dispatch(getUserResume(response.data, idUser));
        } else {
          console.log(response);
        }
      });
    }
  };
};

export const getJobRequestsDictionary = () => {
  return (dispatch: Dispatch) => {
    requestGetControlMethods().then((response) => {
      if (response.status == 200) {
        dispatch({
          type: ActionsService.CONTROL_METHODS,
          payload: response.data,
        });
      } else {
        console.log(response);
      }
    });

    requestGetControlObjects().then((response) => {
      if (response.status == 200) {
        dispatch({
          type: ActionsService.CONTROL_OBJECTS,
          payload: response.data,
        });
      } else {
        console.log(response);
      }
    });

    requestGetUserQualification().then((response) => {
      if (response.status == 200) {
        dispatch({
          type: ActionsService.USER_QUALIFICATION,
          payload: response.data,
        });
      } else {
        console.log(response);
      }
    });
  };
};

export const getRootNodes = (
  condition: TreeNodeNames,
  setResultCallback: Function,
  sortingOrder?: Array<string>,
  setErrorCallback?: Function,
  setLoading?: Function,
  setVisibleSearch?: Function
) => {
  return (dispatch: Dispatch) => {
    setLoading && setLoading(true);
    setErrorCallback && setErrorCallback('');

    requestGetTreeNodeRoots()
      .then((response) => {
        if (response.status === 200) {
          const files = response.data.find(
            (item: TreeNodeModel) => item.name === condition
          );
          setResultCallback(sorting(files.children, sortingOrder));
          setVisibleSearch &&
            setVisibleSearch(files.children.length > DEFAULT_NODES_LENGTH);
        } else {
          dispatch({
            type: ActionsService.SHOW_POPUP,
            payload: {
              message: 'Не удалось загрузить дерево',
              type: PopUpTypeConstants.ERROR,
            },
          });

          setErrorCallback &&
            setErrorCallback(ErrorTitleConstants.SERVER_ERROR);
        }
      })
      .finally(() => setLoading && setLoading(false));
  };
};

export const logOut = () => {
  return (dispatch: Dispatch) => {
    requestLogout().then((response) => {
      if (response.status == 200) {
        dispatch({ type: ActionsUser.USER_LOGIN, payload: false });
        dispatch({ type: ActionsUser.USER_PROFILE, payload: undefined });
      } else {
        dispatch({
          type: ActionsService.SHOW_POPUP,
          payload: {
            message: 'Ошибка выхода из системы',
            type: PopUpTypeConstants.ERROR,
          },
        });
      }
    });
  };
};

export const updateJobLists = (requestParams: ListParams) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionsQuery.USER_REQUESTS_QUERY,
      payload: { loading: true },
    });
    requestJobLists(requestParams).then((response) => {
      const isGoodResponse = response.status == 200;
      if (isGoodResponse) {
        dispatch({ type: ActionsUser.USER_REQUESTS, payload: response.data });
      } else {
        dispatch({
          type: ActionsService.SHOW_POPUP,
          payload: {
            message: 'Ошибка при сохранении данных',
            type: PopUpTypeConstants.ERROR,
          },
        });
      }

      dispatch({
        type: ActionsQuery.USER_REQUESTS_QUERY,
        payload: {
          loading: false,
          error: isGoodResponse ? '' : ErrorTitleConstants.SERVER_ERROR,
        },
      });
    });
  };
};

export const getHelpTasks = (requestParams: ListParams) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionsQuery.USER_QUESTIONS_QUERY,
      payload: { loading: true },
    });

    getSupportTasks(requestParams).then((response) => {
      const isGoodResponse = response.status == 200;
      if (isGoodResponse) {
        const data = response.data;
        data.items.map(
          (item: SupportTaskModel) =>
            (item.createdAt = moment(item.createdAt).format(
              DateFormat.DEFAULT_FORMAT
            ))
        );
        dispatch({ type: ActionsUser.USER_QUESTIONS, payload: response.data });
      } else {
        dispatch(getErrorObject());
      }

      dispatch({
        type: ActionsQuery.USER_QUESTIONS_QUERY,
        payload: {
          loading: false,
          error: isGoodResponse ? '' : ErrorTitleConstants.SERVER_ERROR,
        },
      });
    });
  };
};

export const getNotifications = () => {
  return (dispatch: Dispatch) => {
    requestNotificationsList().then((response) => {
      if (response.status === 200) {
        dispatch({
          type: ActionsUser.USER_NOTIFICATIONS,
          payload: response.data,
        });
      } else {
        dispatch(getErrorObject());
      }
    });
  };
};

export const getReports = (requestParams: ListParams) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionsQuery.USER_REPORTS_QUERY,
      payload: { loading: true },
    });
    requestGetReportList(requestParams).then((response) => {
      const isGoodResponse = response.status === 200;
      if (isGoodResponse) {
        const result = response.data;
        result.items = result.items.filter(
          (item: any) =>
            (item.createdAt = moment(item.createdAt).format(
              DateFormat.DEFAULT_FORMAT
            ))
        );

        dispatch({ type: ActionsUser.USER_REPORTS, payload: result.items });
      } else {
        dispatch(getErrorObject());
      }

      dispatch({
        type: ActionsQuery.USER_REPORTS_QUERY,
        payload: {
          loading: false,
          error: isGoodResponse ? '' : ErrorTitleConstants.SERVER_ERROR,
        },
      });
    });
  };
};
