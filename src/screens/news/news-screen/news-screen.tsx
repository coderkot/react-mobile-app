import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { NewsItem } from '../../../components/news-item';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { PagedEntities } from '../../../server/models/models';
import { ListParams } from '../../../server/request-types';
import { DEFAULT_PAGE_SIZE } from '../../../constants/setting-constants';
import { getAllNews } from '../../../server/requests';
import { NoData } from '../../../components/no-data';
import { ErrorTitleConstants } from '../../../constants/errors-constant';

export const NewsScreen = () => {
  const navigation = useNavigation();
  const [news, setNews] = useState<PagedEntities<CommonNewsItem>>({
    items: [],
    itemsCount: 0,
    totalCount: 0,
  });
  const [requestParams, setRequestParams] = useState<ListParams>({
    page: 0,
    size: DEFAULT_PAGE_SIZE,
    isPublished: true,
    sort: [
      {
        direction: 'DESC',
        field: 'publicationDate',
      },
    ],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingError, setLoadingError] = useState<string>('');

  const getNews = () => {
    setLoading(true);
    setLoadingError('');
    getAllNews(requestParams)
      .then((response) => {
        if (response?.status == 200) {
          setNews({
            items:
              response?.data?.items.map((item) => ({
                id: item.id,
                title: item.title,
                shortDescription: item.shortDescription,
                publishDate: item.publicationDate,
              })) || [],
            itemsCount: response?.data?.itemsCount || 0,
            totalCount: response?.data?.totalCount || 0,
          });
        } else {
          setLoadingError(ErrorTitleConstants.SERVER_ERROR);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (requestParams.size > DEFAULT_PAGE_SIZE) {
      getNews();
    }
  }, [requestParams]);

  useFocusEffect(
    useCallback(() => {
      getNews();
    }, [])
  );

  const getMoreNewsHandler = () => {
    setRequestParams((prev) => ({
      ...prev,
      size: (prev.size ?? 0) + DEFAULT_PAGE_SIZE,
    }));
  };

  return (
    <View
      style={{
        marginTop: 10,
      }}
    >
      {news?.items?.length > 0 && (
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(p) => p.id}
          data={news?.items}
          onEndReached={getMoreNewsHandler}
          onEndReachedThreshold={0.1}
          renderItem={({ item, index }) => {
            return (
              <NewsItem
                news={item}
                showShortDescription={true}
                onPress={() =>
                  navigation.navigate('NewsDetail', {
                    id: item.id,
                  })
                }
                style={
                  index === news.items.length - 1 ? { marginBottom: 75 } : {}
                }
              />
            );
          }}
        />
      )}

      <NoData
        loading={loading}
        data={news?.items}
        errorMessage={loadingError}
      />
    </View>
  );
};

export interface CommonNewsItem {
  id: any;
  title: string;
  shortDescription: string;
  publishDate: string;
}
