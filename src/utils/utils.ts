import moment from 'moment';
import { DATE_FORMAT } from '../constants/date-format';
import sanitizeHtml from 'sanitize-html';
import { Dictionary } from '../redux/reducers';
import { DateFormat } from '../constants/format-constants';
import { ActionsService } from '../redux/actions';
import {
  DocumentTypes,
  PopUpTypeConstants,
  StatusTasksTypes,
} from '../constants/type-constants';
import { colors } from '../main-styles';
import { TreeNodeModel } from '../server/models/models';
import { backendApi } from '../constants/backend-api-constants';
import { baseURL } from '../server/requests';
import { DEFAULT_REQUEST_SIZE } from '../constants/setting-constants';

export const phoneRegExp = /^((\+7|7|8)+([0-9]){10})$/gm;
export const numberRegExp = /^[0-9]+$/;
export const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\w\W]{8,}$/;

export const applyPhoneMask = (number: string) => {
  let maskedNumber = number
    .replace(/\s/g, '')
    .replace(/[^+\d]/g, '')
    .replace(/(\d)\++/g, '$1');

  if (maskedNumber[0] != '+' && maskedNumber[0] != undefined) {
    number = `+7${maskedNumber}`;
  }

  if (maskedNumber[0] == '7') {
    number = `+${maskedNumber}`;
  }

  if (maskedNumber[0] == '8') {
    const phoneNumber = maskedNumber[0].replace('8', '');
    number = `+7${phoneNumber}`;
  }

  if (maskedNumber[0] == '+' && maskedNumber[1] == '8') {
    const phoneNumber = maskedNumber[1].replace('8', '7');

    number = `+${phoneNumber}`;
  }

  return number;
};

export const delay = (ms: number): Promise<unknown> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const stringToDate = (date: string): Date => {
  return moment(date, DATE_FORMAT.toUpperCase()).toDate();
};

export const getPrefix = (
  paramName: string,
  isArray: boolean,
  prefix?: string
) => {
  const getParamNameWithPrefix = () =>
    isArray ? prefix + '%5B' + paramName + '%5D' : prefix + '.' + paramName;

  return prefix ? getParamNameWithPrefix() : paramName;
};

export const wrapperSanitizeHtml = (value: any) => {
  return sanitizeHtml(value, {
    disallowedTagsMode: 'discard',
    allowedTags: ['img', 'strong', 'em', 'p', 'br', 'u', 'span', 'a'],
    allowedSchemes: ['data', 'href'],
    allowedAttributes: {
      a: ['href', 'style', 'target', 'rel'],
      img: ['src'],
      p: ['style'],
      span: ['style'],
      em: ['style'],
      u: ['style'],
      strong: ['style'],
    },
    allowedClasses: {
      span: ['ql-size-small', 'ql-size-large', 'ql-size-huge'],
      p: ['ql-align-center', 'ql-align-right', 'ql-align-justify'],
      a: [''],
    },
  });
};

export const parseDate = (date?: string) =>
  date ? moment(date).format(DateFormat.DEFAULT_FORMAT) : '';

export const getObjetsDictionary = (objects?: Array<Dictionary>) => {
  let result: Array<Dictionary> = [];
  if (objects?.length !== 0) {
    objects?.map((item) => {
      result.push(item);
      if (item.submethods && item.submethods.length !== 0) {
        result.push(...item.submethods);
      }
    });
  }
  return result;
};

export const getMethodName = (
  controlMethods: Array<Dictionary>,
  id: string
) => {
  return controlMethods.find((item) => item.id.toString() == id)?.name;
};

export const getQualificationName = (
  userQualifications: Array<any>,
  id: string
) => {
  return userQualifications?.find((item) => item.id.toString() == id)
    ?.description;
};

export const isEmpty = (value: any) => {
  return value == null || false;
};

export const getErrorObject = (): Object => {
  return {
    type: ActionsService.SHOW_POPUP,
    payload: {
      message: 'Ошибка при загрузке данных',
      type: PopUpTypeConstants.ERROR,
    },
  };
};

export const defaultRequestParams = (direction: string, field: string) => {
  return {
    page: 0,
    size: DEFAULT_REQUEST_SIZE,
    sort: [
      {
        direction: direction,
        field: field,
      },
    ],
  };
};

export const declension = (forms: Array<string>, number: number) => {
  return number % 10 === 1 && number % 100 !== 11
    ? forms[0]
    : number % 10 >= 2 &&
      number % 10 <= 4 &&
      (number % 100 < 10 || number % 100 >= 20)
    ? forms[1]
    : forms[2];
};

export const sorting = (
  nodesList: Array<TreeNodeModel>,
  sortingOrder?: Array<string>
): Array<TreeNodeModel> => {
  if (nodesList.length !== 0) {
    const list1: Array<TreeNodeModel> = [...nodesList];
    const list2: Array<TreeNodeModel> = [];

    sortingOrder?.map((item) => {
      const index = list1.findIndex((node) => node.name == item);
      list2.push(list1[index]);
      list1.splice(index, 1);
    });

    return [...list2, ...list1];
  } else {
    return [];
  }
};

// @ts-ignore
export const flattenMethods = (arr: any) => {
  if (Array.isArray(arr)) {
    return arr.reduce((acc, current) => {
      if (current.submethods && current.submethods?.length > 0) {
        return acc.concat(
          { key: current.code, value: current.name, label: current.name },
          flattenMethods(current.submethods)
        );
      } else {
        return acc.concat({
          key: current.code,
          value: current.name,
          label: current.name,
        });
      }
    }, []);
  } else {
    return { key: arr.id, value: arr.name, name: arr.name };
  }
};

export const getFileRequestURL = (item: TreeNodeModel) => {
  const fileApi =
    item.type === DocumentTypes.DOC
      ? backendApi.filesDoc
      : backendApi.filesVideo;

  return `${baseURL}${fileApi}/${item.fileId}?nodeId=${item.nodeId}`;
};

export const getLicenseBuyUrl = () => {
  const licenseBuyPath = 'inspector/licenses/buy';
  return baseURL.indexOf('api') > 0
    ? baseURL.replace('api', licenseBuyPath)
    : `${baseURL}/licenseBuyPath`;
};

export const badgeColors = new Map();
badgeColors.set(StatusTasksTypes.OPEN, colors.blue);
badgeColors.set(StatusTasksTypes.CLOSE, colors.red);
badgeColors.set(StatusTasksTypes.IN_WORK, colors.yellow);
badgeColors.set(StatusTasksTypes.RESOLVE, colors.green);
badgeColors.set(StatusTasksTypes.PENDING, colors.gray);
badgeColors.set(StatusTasksTypes.CANCELED, colors.black);
