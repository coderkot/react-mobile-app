import React, { useMemo } from 'react';
import { Linking, ScrollView, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { ProfileStyles } from './styles';
import { UserProfileModel } from '../../server/models/models';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { DateFormat } from '../../constants/format-constants';
import { declension } from '../../utils/utils';

export const ProfileSubscribe = () => {
  const userProfile: UserProfileModel | unknown = useSelector<any>(
    (state) => state.userStore.userProfile
  );
  const activeLicense = useMemo(() => {
    return (userProfile as UserProfileModel)?.licenses.find(
      (license) => license.active
    );
  }, [(userProfile as UserProfileModel)?.licenses]);

  const openLink = () => {
    Linking.openURL('https://diagnostpb.ru/auth').catch((error) =>
      console.error(error)
    );
  };

  return (
    <ScrollView>
      <View style={ProfileStyles.subscribeContainer}>
        <View style={ProfileStyles.subscribeDateContainer}>
          <Text style={ProfileStyles.subscribeDateTitle}>
            Дата окончания подписки:
          </Text>
          <Text style={ProfileStyles.subscribeDate}>
            {moment(activeLicense?.expirationDate).format(
              DateFormat.DEFAULT_FORMAT
            )}
          </Text>
        </View>
        {!!activeLicense?.expiryDays && (
          <View style={ProfileStyles.daysLeftContainer}>
            <Text style={ProfileStyles.daysLeftTitle}>Осталось:</Text>
            <Text style={ProfileStyles.daysLeft}>{`${
              activeLicense?.expiryDays
            } ${declension(
              ['день', 'дня', 'дней'],
              activeLicense?.expiryDays as number
            )}`}</Text>
          </View>
        )}
        <View style={ProfileStyles.warningMessageContainer}>
          <Text style={ProfileStyles.warningMessage}>
            Внимание!{'\n'}
            Покупка и Продление подписки {'\n'}
            осуществляется на Web-портале в {'\n'}
            Личном Кабинете.
          </Text>
        </View>
      </View>

      <Button
        title={'Продлить подписку'}
        onPress={() => openLink()}
        buttonStyle={ProfileStyles.subscribeButton}
        containerStyle={{ marginBottom: 102 }}
      />
    </ScrollView>
  );
};
