import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { EducationScreen } from '../../screens/learn/education-screen/education-screen';
import { EducationStackParamList } from './types/education-stack-param-list';
import { MainStyles } from '../../main-styles';
import { HeaderRight } from '../../components/common/header-right';
import { View } from 'react-native';
import { SubItem } from '../../components/SubItem';

const EducationStack = createStackNavigator<EducationStackParamList>();

export const LearnNavigator = () => {
  const options: any = {
    title: 'Методические материалы',
    headerStyle: MainStyles.headerStyles,
    headerTitleAlign: 'center',
    headerBackTitle: '',
    headerBackTitleVisible: false,
  };

  return (
    <View style={{ width: '100%', height: '100%' }}>
      <EducationStack.Navigator>
        <EducationStack.Screen
          name="Education"
          component={EducationScreen}
          options={() => ({
            headerRight: () => <HeaderRight />,
            ...options,
            title: 'Обучение',
          })}
        />

        <EducationStack.Screen
          name={'SubItem'}
          component={SubItem}
          options={() => ({
            headerRight: () => <HeaderRight />,
            ...options,
          })}
        />
      </EducationStack.Navigator>
    </View>
  );
};
