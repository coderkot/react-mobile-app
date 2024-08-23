import React, { useEffect } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { RequestsNavigator } from '../requests';
import { NewsNavigator } from '../news';
import { LearnNavigator } from '../learn';
import { JobNavigator } from '../job';
import { ProfileNavigator } from '../profile';
import { SvgIcon } from '../../components/svg-icon';
import { colors } from '../../main-styles';
import { styles } from './styles';
import { checkAndSavePushToken } from '../../redux/async-storage';
import { StyleProp, ViewStyle } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useSyncFavorites } from '../../hooks/useSyncFavorites';
import { PushNotificationService } from '../../services/PushNotifications/PushNotificationService';
import { ActionsService } from '../../redux/actions';

const Nav = createMaterialBottomTabNavigator();

export const NavigationPanel = (): JSX.Element => {
  const dispatch = useDispatch();
  const offlineMode = useSelector<any>(
    (state) => state.serviceStore.offlineMode
  );
  const profile = useSelector<any>((state) => state.userStore.userProfile);
  useSyncFavorites(profile?.favoriteFiles);

  const getStyles = (): StyleProp<ViewStyle> => {
    return offlineMode ? { display: 'none' } : styles.barStyle;
  };

  useEffect(() => {
    checkAndSavePushToken();
  }, []);

  PushNotificationService(() =>
    dispatch({ type: ActionsService.OPEN_NOTIFICATION_LIST, payload: true })
  );

  return (
    <Nav.Navigator
      activeColor={colors.blue}
      inactiveColor={colors.middleGray}
      style={{
        backgroundColor: colors.whiteGray,
      }}
      barStyle={getStyles()}
      keyboardHidesNavigationBar={true}
    >
      <Nav.Screen
        name="Job"
        component={JobNavigator}
        options={{
          title: 'Работа',
          tabBarIcon: ({ focused }) => {
            return (
              <SvgIcon
                icon="job"
                color={focused ? colors.blue : colors.middleGray}
              />
            );
          },
        }}
      />

      <Nav.Screen
        name="Requests"
        component={RequestsNavigator}
        options={{
          title: 'Запросы',
          tabBarIcon: ({ focused }) => {
            return (
              <SvgIcon
                icon="requests"
                color={focused ? colors.blue : colors.middleGray}
              />
            );
          },
        }}
      />

      <Nav.Screen
        name="Learn"
        component={LearnNavigator}
        options={{
          title: 'Обучение',
          tabBarIcon: ({ focused }) => {
            return (
              <SvgIcon
                icon="learn"
                color={focused ? colors.blue : colors.middleGray}
              />
            );
          },
        }}
      />

      <Nav.Screen
        name="News"
        component={NewsNavigator}
        options={{
          title: 'Новости',
          tabBarLabel: 'Новости',
          tabBarIcon: ({ focused }) => {
            return (
              <SvgIcon
                icon="news"
                color={focused ? colors.blue : colors.middleGray}
              />
            );
          },
        }}
      />

      <Nav.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          title: 'Профиль',
          tabBarIcon: ({ focused }) => {
            return (
              <SvgIcon
                icon="profile"
                color={focused ? colors.blue : colors.middleGray}
              />
            );
          },
        }}
      />
    </Nav.Navigator>
  );
};
