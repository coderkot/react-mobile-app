import { Action, Dispatch } from 'redux';

import { DefectStatementService } from '../../../services/defect-statement-service';
import { DefectStatement } from '../../../types/defect-statement';
import { JobActionTypes } from './job-types';

interface GetAllDefectStatementsActionType
  extends Action<JobActionTypes.GetAllDefectStatements> {}

interface GetAllDefectStatementsActionSuccessType
  extends Action<JobActionTypes.GetAllDefectStatementsSuccess> {
  payload: DefectStatement[];
}

interface GetAllDefectStatementsActionFailureType
  extends Action<JobActionTypes.GetAllDefectStatementsFailure> {
  payload: string;
}

export type GetAllDefectStatementsActionTypes =
  | GetAllDefectStatementsActionType
  | GetAllDefectStatementsActionSuccessType
  | GetAllDefectStatementsActionFailureType;

export const getAllDefectStatements = () => {
  return async (dispatch: Dispatch<GetAllDefectStatementsActionTypes>) => {
    try {
      dispatch({ type: JobActionTypes.GetAllDefectStatements });

      const service: DefectStatementService = new DefectStatementService();
      const defectStatements = await service.getAllStatementsAsync();

      dispatch({
        type: JobActionTypes.GetAllDefectStatementsSuccess,
        payload: defectStatements,
      });
    } catch (e) {
      dispatch({
        type: JobActionTypes.GetAllDefectStatementsFailure,
        payload: (e as Error).message,
      });
    }
  };
};
