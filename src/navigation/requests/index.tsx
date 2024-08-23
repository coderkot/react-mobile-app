import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RequestsScreen } from '../../screens/requests';
import { RequestDetails } from '../../screens/requests/details/requestDetails';
import { RequestsStackParamList } from './types/requests-stack-param-list';
import { MainStyles } from '../../main-styles';
import { StackHeaderOptions } from '@react-navigation/stack/lib/typescript/src/types';
import { HeaderRight } from '../../components/common/header-right';
import { View } from 'react-native';

const RequestsStack = createStackNavigator<RequestsStackParamList>();

export const RequestsNavigator = () => {
  const options: StackHeaderOptions = {
    headerStyle: MainStyles.headerStyles,
    headerTitleAlign: 'center',
    headerBackTitle: '',
    headerBackTitleVisible: false,
  };

  return (
    <View style={{ width: '100%', height: '100%' }}>
      <RequestsStack.Navigator>
        <RequestsStack.Screen
          name="Requests"
          component={RequestsScreen}
          options={() => ({
            headerRight: () => <HeaderRight />,
            ...options,
            title: 'Запросы на работу',
          })}
        />
        <RequestsStack.Screen
          name="RequestDetail"
          component={RequestDetails}
          options={() => ({
            headerRight: () => <HeaderRight />,
            ...options,
            title: 'Детали запроса',
          })}
        />
      </RequestsStack.Navigator>
    </View>
  );
};
