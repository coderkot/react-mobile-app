import { Leaf } from '../../../../types/node/leaf';

export interface JobFilesScreenData {
  isLoading: boolean;
  error: string | null;
  documents: Leaf[];
}
