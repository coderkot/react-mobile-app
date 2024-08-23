import { LeafType } from './leaf-type';

export interface Leaf {
  name: string;
  type: LeafType;
  fieldId: string;
  uri: string;
  isFavorited?: boolean;
}
