import { News } from '../../../../types/news';
import { NewsScreenData } from './news-screen-data';

export interface NewsState {
  news: News[];
  newsScreenData: NewsScreenData;
}
