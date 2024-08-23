import React, { useEffect, useState } from 'react';
import { ScrollView, Switch, Text, View } from 'react-native';
import { colors } from '../../main-styles';
import { ProfileStyles } from './styles';
import {
  EmailGroup,
  NotificationSettings,
  PushGroup,
} from '../../constants/setting-constants';
import {
  requestGetNotificationSettings,
  requestUpdateNotificationSettings,
} from '../../server/requests';
import { ActionsService } from '../../redux/actions';
import { PopUpTypeConstants } from '../../constants/type-constants';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ProfileNotifications = (): JSX.Element => {
  const dispatch = useDispatch();
  const [mainPushIsEnabled, setMainPushIsEnabled] = useState('enable');
  const [pushesIsDisabled, setPushesIsDisabled] = useState(false);

  const [jobPushIsEnabled, setJobPushIsEnabled] = useState(true);
  const [newsPushIsEnabled, setNewsPushIsEnabled] = useState(true);
  const [docPushIsEnabled, setDocPushIsEnabled] = useState(true);
  const [qaPushIsEnabled, setQaPushIsEnabled] = useState(true);

  const [mainEmailIsEnabled, setMainEmailIsEnabled] = useState('enable');
  const [emailIsDisabled, setEmailIsDisabled] = useState(false);

  const [jobEmailIsEnabled, setJobEmailIsEnabled] = useState(true);
  const [newsEmailIsEnabled, setNewsEmailIsEnabled] = useState(true);
  const [docEmailIsEnabled, setDocEmailIsEnabled] = useState(true);
  const [qaEmailIsEnabled, setQaEmailIsEnabled] = useState(true);

  const [settings, setSettings] = useState<Array<string>>([]);

  const setNotifications = (data: Array<string>) => {
    setJobPushIsEnabled(data.includes(NotificationSettings.JOB_APP_PUSH));
    setNewsPushIsEnabled(data.includes(NotificationSettings.NEWS_PUSH));
    setDocPushIsEnabled(data.includes(NotificationSettings.DOC_PUSH));
    setQaPushIsEnabled(data.includes(NotificationSettings.NEW_ANSWER_PUSH));

    setJobEmailIsEnabled(data.includes(NotificationSettings.JOB_APP_EMAIL));
    setNewsEmailIsEnabled(data.includes(NotificationSettings.NEWS_EMAIL));
    setDocEmailIsEnabled(data.includes(NotificationSettings.DOC_EMAIL));
    setQaEmailIsEnabled(data.includes(NotificationSettings.NEW_ANSWER_EMAIL));
  };

  useEffect(() => {
    requestGetNotificationSettings().then((response) => {
      if (response.status == 200) {
        setNotifications(response.data.notificationSettings);
        setSettings(response.data.notificationSettings);

        AsyncStorage.getItem('AllPushesIsDisabled').then((result) => {
          if (!result) {
            AsyncStorage.setItem('AllPushesIsDisabled', 'enable');
          } else {
            setMainPushIsEnabled(result);
            setPushesIsDisabled(result !== 'enable');
          }
        });

        AsyncStorage.getItem('AllEmailIsDisabled').then((result) => {
          if (!result) {
            AsyncStorage.setItem('AllEmailIsDisabled', 'enable');
          } else {
            setMainEmailIsEnabled(result);
            setEmailIsDisabled(result !== 'enable');
          }
        });
      } else {
        dispatch({
          type: ActionsService.SHOW_POPUP,
          payload: {
            message: 'Не удалось загрузить настройки',
            type: PopUpTypeConstants.ERROR,
          },
        });
      }
    });
  }, []);

  const toggleNotification = (name: string, setterCallback: Function) => {
    if (settings.includes(name)) {
      const index = settings.indexOf(name);
      settings.splice(index, 1);
    } else {
      settings.push(name);
    }

    setterCallback(settings.includes(name));

    const updatedSettings = { notificationSettings: settings };
    requestUpdateNotificationSettings(updatedSettings);
  };

  const excludeSettings = (excludingGroup: Array<string>) => {
    return settings.filter(
      (item) => !excludingGroup.includes(item as NotificationSettings)
    );
  };

  const toggleMainPush = () => {
    AsyncStorage.getItem('AllPushesIsDisabled').then((result) => {
      if (result === 'enable') {
        const updatedSettings = excludeSettings(PushGroup);
        setNotifications(updatedSettings);
        setSettings(updatedSettings);
        setPushesIsDisabled(true);
        setMainPushIsEnabled('disable');
        AsyncStorage.setItem('AllPushesIsDisabled', 'disable');
        requestUpdateNotificationSettings({
          notificationSettings: updatedSettings,
        });
      } else {
        setPushesIsDisabled(false);
        setMainPushIsEnabled('enable');
        AsyncStorage.setItem('AllPushesIsDisabled', 'enable');
      }
    });
  };

  const toggleMainEmail = () => {
    AsyncStorage.getItem('AllEmailIsDisabled').then((result) => {
      if (result === 'enable') {
        const updatedSettings = excludeSettings(EmailGroup);
        setNotifications(updatedSettings);
        setSettings(updatedSettings);
        setEmailIsDisabled(true);
        setMainEmailIsEnabled('disable');
        AsyncStorage.setItem('AllEmailIsDisabled', 'disable');
        requestUpdateNotificationSettings({
          notificationSettings: updatedSettings,
        });
      } else {
        setEmailIsDisabled(false);
        setMainEmailIsEnabled('enable');
        AsyncStorage.setItem('AllEmailIsDisabled', 'enable');
      }
    });
  };

  return (
    <ScrollView>
      <View style={ProfileStyles.notificationHeader}>
        <Text style={ProfileStyles.notificationHeaderTitle}>
          Push уведомления
        </Text>
        <Switch
          value={mainPushIsEnabled === 'enable'}
          onValueChange={toggleMainPush}
          trackColor={{ false: colors.veryLightGray, true: colors.blue }}
          thumbColor={colors.white}
        />
      </View>

      <View style={ProfileStyles.notificationsContainer}>
        <View style={ProfileStyles.notificationsItem}>
          <Text style={ProfileStyles.notificationsItemTitle}>
            Запросы на работу
          </Text>
          <Switch
            value={jobPushIsEnabled}
            onValueChange={() =>
              toggleNotification(
                NotificationSettings.JOB_APP_PUSH,
                setJobPushIsEnabled
              )
            }
            trackColor={{ false: colors.veryLightGray, true: colors.blue }}
            thumbColor={colors.white}
            disabled={pushesIsDisabled}
            style={{ opacity: pushesIsDisabled ? 0.5 : 1 }}
          />
        </View>

        <View style={ProfileStyles.notificationsItem}>
          <Text style={ProfileStyles.notificationsItemTitle}>
            Новости отрасли
          </Text>
          <Switch
            value={newsPushIsEnabled}
            onValueChange={() =>
              toggleNotification(
                NotificationSettings.NEWS_PUSH,
                setNewsPushIsEnabled
              )
            }
            trackColor={{ false: colors.veryLightGray, true: colors.blue }}
            thumbColor={colors.white}
            disabled={pushesIsDisabled}
            style={{ opacity: pushesIsDisabled ? 0.5 : 1 }}
          />
        </View>

        <View style={ProfileStyles.notificationsItem}>
          <Text style={ProfileStyles.notificationsItemTitle}>Документация</Text>
          <Switch
            value={docPushIsEnabled}
            onValueChange={() =>
              toggleNotification(
                NotificationSettings.DOC_PUSH,
                setDocPushIsEnabled
              )
            }
            trackColor={{ false: colors.veryLightGray, true: colors.blue }}
            thumbColor={colors.white}
            disabled={pushesIsDisabled}
            style={{ opacity: pushesIsDisabled ? 0.5 : 1 }}
          />
        </View>

        <View style={ProfileStyles.notificationsItem}>
          <Text style={ProfileStyles.notificationsItemTitle}>
            Ответы на вопросы
          </Text>
          <Switch
            value={qaPushIsEnabled}
            onValueChange={() =>
              toggleNotification(
                NotificationSettings.NEW_ANSWER_PUSH,
                setQaPushIsEnabled
              )
            }
            trackColor={{ false: colors.veryLightGray, true: colors.blue }}
            thumbColor={colors.white}
            disabled={pushesIsDisabled}
            style={{ opacity: pushesIsDisabled ? 0.5 : 1 }}
          />
        </View>
      </View>

      <View style={ProfileStyles.notificationHeader}>
        <Text style={ProfileStyles.notificationHeaderTitle}>
          E-mail уведомления
        </Text>
        <Switch
          value={mainEmailIsEnabled === 'enable'}
          onValueChange={toggleMainEmail}
          trackColor={{ false: colors.veryLightGray, true: colors.blue }}
          thumbColor={colors.white}
        />
      </View>
      <View
        style={{ ...ProfileStyles.notificationsContainer, marginBottom: 102 }}
      >
        <View style={ProfileStyles.notificationsItem}>
          <Text style={ProfileStyles.notificationsItemTitle}>
            Запросы на работу
          </Text>
          <Switch
            value={jobEmailIsEnabled}
            onValueChange={() =>
              toggleNotification(
                NotificationSettings.JOB_APP_EMAIL,
                setJobEmailIsEnabled
              )
            }
            trackColor={{ false: colors.veryLightGray, true: colors.blue }}
            thumbColor={colors.white}
            disabled={emailIsDisabled}
            style={{ opacity: emailIsDisabled ? 0.5 : 1 }}
          />
        </View>

        <View style={ProfileStyles.notificationsItem}>
          <Text style={ProfileStyles.notificationsItemTitle}>
            Новости отрасли
          </Text>
          <Switch
            value={newsEmailIsEnabled}
            onValueChange={() =>
              toggleNotification(
                NotificationSettings.NEWS_EMAIL,
                setNewsEmailIsEnabled
              )
            }
            trackColor={{ false: colors.veryLightGray, true: colors.blue }}
            thumbColor={colors.white}
            disabled={emailIsDisabled}
            style={{ opacity: emailIsDisabled ? 0.5 : 1 }}
          />
        </View>

        <View style={ProfileStyles.notificationsItem}>
          <Text style={ProfileStyles.notificationsItemTitle}>Документация</Text>
          <Switch
            value={docEmailIsEnabled}
            onValueChange={() =>
              toggleNotification(
                NotificationSettings.DOC_EMAIL,
                setDocEmailIsEnabled
              )
            }
            trackColor={{ false: colors.veryLightGray, true: colors.blue }}
            thumbColor={colors.white}
            disabled={emailIsDisabled}
            style={{ opacity: emailIsDisabled ? 0.5 : 1 }}
          />
        </View>

        <View style={ProfileStyles.notificationsItem}>
          <Text style={ProfileStyles.notificationsItemTitle}>
            Ответы на вопросы
          </Text>
          <Switch
            value={qaEmailIsEnabled}
            onValueChange={() =>
              toggleNotification(
                NotificationSettings.NEW_ANSWER_EMAIL,
                setQaEmailIsEnabled
              )
            }
            trackColor={{ false: colors.veryLightGray, true: colors.blue }}
            thumbColor={colors.white}
            disabled={emailIsDisabled}
            style={{ opacity: emailIsDisabled ? 0.5 : 1 }}
          />
        </View>
      </View>
    </ScrollView>
  );
};
