import { Leaf } from '../../../../types/node/leaf';

export interface EducationFilesScreenData {
  isLoading: boolean;
  error: string | null;
  leafs: Leaf[];
}
