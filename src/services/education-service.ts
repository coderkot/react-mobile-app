import { delay } from '../utils/utils';
import { Leaf } from '../types/node/leaf';
import { Node } from '../types/node/node';
import {
  createLeafsForId111createSubNodesForId1EducationService,
  createRootWithChildrenEducationService,
  createSubNodesForId11createSubNodesForId1EducationService,
  createSubNodesForId1EducationService,
} from './fake-data/fake-nodes';

export class EducationService {
  async getAllRootNodes(): Promise<Node[]> {
    return createRootWithChildrenEducationService();
  }

  async getSubNodes(parentId: string): Promise<Node[]> {
    if (parentId === '1') {
      return [...createSubNodesForId1EducationService(parentId)];
    }

    if (parentId === '11') {
      return [
        ...createSubNodesForId11createSubNodesForId1EducationService(parentId),
      ];
    }

    return [];
  }

  async getLeafs(parentId: string): Promise<Leaf[]> {
    if (parentId === '111') {
      const items = createLeafsForId111createSubNodesForId1EducationService();
      return [...items];
    }

    return [];
  }
}
