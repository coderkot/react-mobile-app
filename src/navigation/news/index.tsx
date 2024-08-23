import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NewsDetailScreen } from '../../screens/news/news-detail-screen/news-detail-screen';
import { NewsScreen } from '../../screens/news/news-screen/news-screen';
import { NewsStackParamList } from './types/news-stack-param-list';
import { MainStyles } from '../../main-styles';
import { HeaderRight } from '../../components/common/header-right';
import { View } from 'react-native';

const NewsStack = createStackNavigator<NewsStackParamList>();

export const NewsNavigator = () => {
  const options: any = {
    title: 'Новости отрасли',
    headerStyle: MainStyles.headerStyles,
    headerTitleAlign: 'center',
    headerBackTitle: '',
    headerBackTitleVisible: false,
  };

  return (
    <View style={{ width: '100%', height: '100%' }}>
      <NewsStack.Navigator>
        <NewsStack.Screen
          name="News"
          component={NewsScreen}
          options={() => ({
            headerRight: () => <HeaderRight />,
            ...options,
          })}
        />
        <NewsStack.Screen
          name="NewsDetail"
          component={NewsDetailScreen}
          options={() => ({
            headerRight: () => <HeaderRight />,
            ...options,
          })}
        />
      </NewsStack.Navigator>
    </View>
  );
};
