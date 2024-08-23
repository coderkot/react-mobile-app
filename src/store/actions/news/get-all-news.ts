import { Action, Dispatch } from 'redux';

import { NewsService } from '../../../services/news-service';
import { News } from '../../../types/news';
import { NewsActionTypes } from './news-types';

interface GetAllNewsActionType extends Action<NewsActionTypes.GetAllNews> {}

interface GetAllNewsActionSuccessType
  extends Action<NewsActionTypes.GetAllNewsSuccess> {
  payload: News[];
}

interface GetAllNewsActionFailureType
  extends Action<NewsActionTypes.GetAllNewsFailure> {
  payload: string;
}

export type GetAllNewsActionTypes =
  | GetAllNewsActionType
  | GetAllNewsActionSuccessType
  | GetAllNewsActionFailureType;

export const getAllNews = () => {
  return async (dispatch: Dispatch<GetAllNewsActionTypes>) => {
    try {
      dispatch({ type: NewsActionTypes.GetAllNews });

      const service: NewsService = new NewsService();
      const news = await service.getAllNewsAsync();

      dispatch({
        type: NewsActionTypes.GetAllNewsSuccess,
        payload: news,
      });
    } catch (e) {
      dispatch({
        type: NewsActionTypes.GetAllNewsFailure,
        payload: (e as Error).message,
      });
    }
  };
};
