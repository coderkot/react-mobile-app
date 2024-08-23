import { delay } from '../utils/utils';
import { Ad } from '../types/ad';
import { Leaf } from '../types/node/leaf';
import { Node } from '../types/node/node';
import { fakeAds } from './fake-data/fake-ads';
import {
  createAllNodesJobService,
  createDocuments,
  createSubNodesJobServiceForId1,
} from './fake-data/fake-nodes';

export class JobService {
  async getAllNodesAsync(): Promise<Node[]> {
    return createAllNodesJobService();
  }

  async getSubNodesAsync(parentId: string): Promise<Node[]> {
    return createSubNodesJobServiceForId1(parentId);
  }

  async getDocumentsAsync(parentId: string): Promise<Leaf[]> {
    if (parentId === '11') {
      const items = createDocuments();
      return [...items];
    }

    return [];
  }

  async addOrDeleteFileFromFavoritesAsync(
    fileId: string,
    isFavorited: boolean
  ): Promise<Leaf> {
    const documents = createDocuments();

    const document = documents.find((p) => p.fieldId === fileId);

    if (!document) {
      throw new Error('Документ на найден');
    }

    document.isFavorited = isFavorited;
    console.log('addOrDeleteFileFromFavorites', document);

    return { ...document };
  }

  async getAllAdsAsync(): Promise<Ad[]> {
    return fakeAds;
  }
}
