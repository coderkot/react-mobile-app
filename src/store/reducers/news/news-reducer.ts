import { GetAllNewsActionTypes } from '../../actions/news/get-all-news';
import { NewsActionTypes } from '../../actions/news/news-types';
import { NewsState } from './types/news-state';

const initialState: NewsState = {
  news: [],
  newsScreenData: {
    error: null,
    isLoading: false,
  },
};

export const newsReducer = (
  state = initialState,
  action: GetAllNewsActionTypes
): NewsState => {
  switch (action.type) {
    case NewsActionTypes.GetAllNews:
      return {
        ...state,
        newsScreenData: {
          error: null,
          isLoading: true,
        },
      };
    case NewsActionTypes.GetAllNewsSuccess:
      return {
        ...state,
        newsScreenData: {
          error: null,
          isLoading: false,
        },
        news: action.payload,
      };
    case NewsActionTypes.GetAllNewsFailure:
      return {
        ...state,
        newsScreenData: {
          error: action.payload,
          isLoading: false,
        },
        news: [],
      };
    default:
      return state;
  }
};
