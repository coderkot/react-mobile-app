import { DefectStatement } from '../../../../types/defect-statement';

export interface DefectStatementScreenData {
  isLoading: boolean;
  isCreating: boolean;
  error: string | null;
  createError: string | null;
  defectStatements: DefectStatement[];
}
