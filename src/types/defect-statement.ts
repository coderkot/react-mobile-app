import { Defect } from './defect';

export interface DefectStatement {
  name: string;
  createdAt: Date;
  controlObjectDescription: string;
  controlMethodDescription: string;
  nameInspector: string;
  defects: Defect;
  email1: string;
  email2?: string;
  email3?: string;
}
