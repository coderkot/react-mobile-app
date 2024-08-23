export interface Node {
  id: string;
  name: string;
  parentId: string | null;
  hasLeaves: boolean;
  hasChildren: boolean;
}
