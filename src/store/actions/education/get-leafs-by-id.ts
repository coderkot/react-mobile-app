import { Action, Dispatch } from 'redux';

import { EducationService } from '../../../services/education-service';
import { Leaf } from '../../../types/node/leaf';
import { EducationActionTypes } from './education-types';

interface GetLeafsActionType extends Action<EducationActionTypes.GetLeafs> {}

interface GetLeafsActionSuccessType
  extends Action<EducationActionTypes.GetLeafsSuccess> {
  payload: Leaf[];
}

interface GetLeafsActionFailureType
  extends Action<EducationActionTypes.GetLeafsFailure> {
  payload: string;
}

export type GetLeafsActionTypes =
  | GetLeafsActionType
  | GetLeafsActionSuccessType
  | GetLeafsActionFailureType;

export const getLeafs = (parentId: string) => {
  return async (dispatch: Dispatch<GetLeafsActionTypes>) => {
    try {
      dispatch({ type: EducationActionTypes.GetLeafs });

      const service: EducationService = new EducationService();
      const leafs = await service.getLeafs(parentId);

      dispatch({
        type: EducationActionTypes.GetLeafsSuccess,
        payload: leafs,
      });
    } catch (e) {
      dispatch({
        type: EducationActionTypes.GetLeafsFailure,
        payload: (e as Error).message,
      });
    }
  };
};
