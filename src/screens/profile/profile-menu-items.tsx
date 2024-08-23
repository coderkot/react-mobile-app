import React, { ReactNode } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { ProfileStyles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import PersonalDataIcon from '../../assets/icons/svg/profile/personal-data.svg';
import FavoriteIcon from '../../assets/icons/svg/in-favorite.svg';
import CVIcon from '../../assets/icons/svg/profile/cv.svg';
import InfoIcon from '../../assets/icons/svg/profile/info.svg';
import SubscribeIcon from '../../assets/icons/svg/profile/subscribe.svg';
import NotificationIcon from '../../assets/icons/svg/profile/notifications.svg';
import { logoutHandler } from '../../utils/auth-utils';

export const ProfileMenuItems = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const logout = () => logoutHandler(dispatch);
  const menuItems: Array<{
    name: string;
    icon: ReactNode;
    id: string;
    onPress: () => void;
  }> = [
    {
      name: 'Личные данные',
      id: '1',
      icon: <PersonalDataIcon />,
      onPress: () => {
        navigation.navigate('PersonalData', {
          menuTitle: 'Личные данные',
        });
      },
    },
    {
      name: 'Избранное',
      id: '2',
      icon: <FavoriteIcon />,
      onPress: () => {
        navigation.navigate('Favorites', {
          menuTitle: 'Избранное',
        });
      },
    },
    {
      name: 'Резюме',
      icon: <CVIcon />,
      id: '3',
      onPress: () => {
        navigation.navigate('ProfileCv', {
          menuTitle: 'Резюме',
        });
      },
    },
    {
      name: 'Задать вопрос',
      id: '4',
      icon: <InfoIcon />,
      onPress: () => {
        navigation.navigate('Help', {
          menuTitle: 'Задать вопрос',
        });
      },
    },
    {
      name: 'Подписка',
      id: '5',
      icon: <SubscribeIcon />,
      onPress: () => {
        navigation.navigate('Subscribe', {
          menuTitle: 'Подписка',
        });
      },
    },
    {
      name: 'Настройки уведомлений',
      id: '6',
      icon: <NotificationIcon />,
      onPress: () => {
        navigation.navigate('NotificationSettings', {
          menuTitle: 'Настройки уведомлений',
        });
      },
    },
  ];

  return (
    <View style={{ marginTop: 24, flexDirection: 'column', flex: 1 }}>
      <FlatList
        style={{ marginBottom: 10 }}
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={item.onPress}>
            <ListItem bottomDivider containerStyle={ProfileStyles.menuItems}>
              <ListItem.Content style={ProfileStyles.content}>
                {item.icon}
                <ListItem.Title style={ProfileStyles.menuTitle}>
                  {item.name}
                </ListItem.Title>
              </ListItem.Content>
            </ListItem>
          </TouchableOpacity>
        )}
      />

      <Button
        title={'Выйти'}
        onPress={logout}
        buttonStyle={ProfileStyles.exitButton}
      />
    </View>
  );
};
