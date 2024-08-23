import { Action, Dispatch } from 'redux';

import { EducationService } from '../../../services/education-service';
import { Node } from '../../../types/node/node';
import { EducationActionTypes } from './education-types';

interface GetSubNodesActionType
  extends Action<EducationActionTypes.GetSubNodes> {}

interface GetSubNodesActionSuccessType
  extends Action<EducationActionTypes.GetSubNodesSuccess> {
  payload: Node[];
}

interface GetSubNodesActionFailureType
  extends Action<EducationActionTypes.GetSubNodesFailure> {
  payload: string;
}

export type GetSubNodesActionTypes =
  | GetSubNodesActionType
  | GetSubNodesActionSuccessType
  | GetSubNodesActionFailureType;

export const getSubNodes = (parentId: string) => {
  return async (dispatch: Dispatch<GetSubNodesActionTypes>) => {
    try {
      dispatch({ type: EducationActionTypes.GetSubNodes });

      const service: EducationService = new EducationService();
      const nodes = await service.getSubNodes(parentId);

      dispatch({
        type: EducationActionTypes.GetSubNodesSuccess,
        payload: nodes,
      });
    } catch (e) {
      dispatch({
        type: EducationActionTypes.GetSubNodesFailure,
        payload: (e as Error).message,
      });
    }
  };
};
