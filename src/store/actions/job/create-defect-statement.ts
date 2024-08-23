import { Action, Dispatch } from 'redux';

import { DefectStatementService } from '../../../services/defect-statement-service';
import { DefectStatement } from '../../../types/defect-statement';
import { JobActionTypes } from './job-types';

interface CreateDefectStatementActionType
  extends Action<JobActionTypes.CreateDefectStatement> {}

interface CreateDefectStatementActionSuccessType
  extends Action<JobActionTypes.CreateDefectStatementSuccess> {
  payload: DefectStatement;
}

interface CreateDefectStatementActionFailureType
  extends Action<JobActionTypes.CreateDefectStatementFailure> {
  payload: string;
}

export type CreateDefectStatementActionTypes =
  | CreateDefectStatementActionType
  | CreateDefectStatementActionSuccessType
  | CreateDefectStatementActionFailureType;

export const createDefectStatement = (defectStatement: DefectStatement) => {
  return async (dispatch: Dispatch<CreateDefectStatementActionTypes>) => {
    try {
      dispatch({ type: JobActionTypes.CreateDefectStatement });

      const service: DefectStatementService = new DefectStatementService();
      const ds = await service.createDefectStatementsAsync(defectStatement);

      dispatch({
        type: JobActionTypes.CreateDefectStatementSuccess,
        payload: ds,
      });
    } catch (e) {
      dispatch({
        type: JobActionTypes.CreateDefectStatementFailure,
        payload: (e as Error).message,
      });
    }
  };
};
