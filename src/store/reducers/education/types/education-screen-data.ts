import { Node } from '../../../../types/node/node';

export interface EducationScreenData {
  isLoading: boolean;
  error: string | null;
  rootNodes: Node[];
}
