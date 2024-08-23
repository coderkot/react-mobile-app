import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { PersonalData } from '../../screens/profile/personal-data/personal-data';
import { ProfileMenuItems } from '../../screens/profile/profile-menu-items';
import { Favorites } from '../../screens/profile/favorites';
import { ProfileCv } from '../../screens/profile/profile-cv';
import { MainStyles } from '../../main-styles';
import { ProfileSubscribe } from '../../screens/profile/profile-subscribe';
import { ProfileNotifications } from '../../screens/profile/profile-notifications';
import { HeaderRight } from '../../components/common/header-right';
import { View } from 'react-native';
import { HelpMenu } from '../../screens/profile/help/help-menu';
import { HelpView } from '../../screens/profile/help/help-view';
import { useSelector } from 'react-redux';

const ProfileMenuStack = createStackNavigator();

export const ProfileNavigator = (): JSX.Element => {
  const options: any = {
    headerStyle: MainStyles.headerStyles,
    headerTitleAlign: 'center',
    headerBackTitle: '',
    headerBackTitleVisible: false,
  };

  return (
    <View style={{ width: '100%', height: '100%' }}>
      <ProfileMenuStack.Navigator>
        <ProfileMenuStack.Screen
          name="ProfileMenuItems"
          component={ProfileMenuItems}
          options={() => ({
            headerRight: () => <HeaderRight />,
            ...options,
            title: 'Профиль',
          })}
        />
        <ProfileMenuStack.Screen
          name="PersonalData"
          component={PersonalData}
          options={() => ({
            headerRight: () => <HeaderRight />,
            ...options,
            title: 'Личные данные',
          })}
        />
        <ProfileMenuStack.Screen
          name="Favorites"
          component={Favorites}
          options={() => ({
            headerRight: () => <HeaderRight />,
            ...options,
            title: 'Избранное',
          })}
        />
        <ProfileMenuStack.Screen
          name="ProfileCv"
          component={ProfileCv}
          options={() => ({
            headerRight: () => <HeaderRight />,
            ...options,
            title: 'Резюме',
          })}
        />

        <ProfileMenuStack.Screen
          name="Help"
          component={HelpMenu}
          options={() => ({
            headerRight: () => <HeaderRight />,
            ...options,
            title: 'Задать вопрос',
          })}
        />
        <ProfileMenuStack.Screen
          name={'HelpView'}
          component={HelpView}
          options={() => ({
            headerRight: () => <HeaderRight />,
            ...options,
            title: 'Задать вопрос',
          })}
        />

        <ProfileMenuStack.Screen
          name="Subscribe"
          component={ProfileSubscribe}
          options={() => ({
            headerRight: () => <HeaderRight />,
            ...options,
            title: 'Подписка',
          })}
        />
        <ProfileMenuStack.Screen
          name="NotificationSettings"
          component={ProfileNotifications}
          options={() => ({
            headerRight: () => <HeaderRight />,
            ...options,
            title: 'Настройки уведомлений',
          })}
        />
      </ProfileMenuStack.Navigator>
    </View>
  );
};
