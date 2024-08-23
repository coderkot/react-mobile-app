import { delay } from '../utils/utils';
import { News } from '../types/news';
import { fakeNews } from './fake-data/fake-news';

export class NewsService {
  async getAllNewsAsync(): Promise<News[]> {
    return fakeNews;
  }
}
