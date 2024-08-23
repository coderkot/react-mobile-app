import { Action, Dispatch } from 'redux';

import { EducationService } from '../../../services/education-service';
import { Node } from '../../../types/node/node';
import { EducationActionTypes } from './education-types';

interface GetAllRootNodesActionType
  extends Action<EducationActionTypes.GetAllRootNodes> {}

interface GetAllRootNodesActionSuccessType
  extends Action<EducationActionTypes.GetAllRootNodesSuccess> {
  payload: Node[];
}

interface GetAllRootNodesActionFailureType
  extends Action<EducationActionTypes.GetAllRootNodesFailure> {
  payload: string;
}

export type GetAllRootNodesActionTypes =
  | GetAllRootNodesActionType
  | GetAllRootNodesActionSuccessType
  | GetAllRootNodesActionFailureType;

export const getAllRootNodes = () => {
  return async (dispatch: Dispatch<GetAllRootNodesActionTypes>) => {
    try {
      dispatch({ type: EducationActionTypes.GetAllRootNodes });

      const service: EducationService = new EducationService();
      const nodes = await service.getAllRootNodes();

      dispatch({
        type: EducationActionTypes.GetAllRootNodesSuccess,
        payload: nodes,
      });
    } catch (e) {
      dispatch({
        type: EducationActionTypes.GetAllRootNodesFailure,
        payload: (e as Error).message,
      });
    }
  };
};
