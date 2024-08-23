import { delay } from '../utils/utils';
import { DefectStatement } from '../types/defect-statement';
import { fakeDefectStatements } from './fake-data/fake-defect-statement';

export class DefectStatementService {
  static createdDefectStatements: DefectStatement[] = [];

  async getAllStatementsAsync(): Promise<DefectStatement[]> {
    const defectStatements = fakeDefectStatements;

    const ids = defectStatements.map((p) => p.id);

    const newItems = DefectStatementService.createdDefectStatements.filter(
      (p) => !ids.includes(p.id)
    );

    return [...defectStatements, ...newItems];
  }

  async createDefectStatementsAsync(
    defectStatement: DefectStatement
  ): Promise<DefectStatement> {
    const ds = { ...defectStatement };
    DefectStatementService.createdDefectStatements.push(ds);

    return ds;
  }
}
