import { Node } from '../../../../types/node/node';

export interface JobScreenData {
  isLoading: boolean;
  error: string | null;
  nodes: Node[];
}
