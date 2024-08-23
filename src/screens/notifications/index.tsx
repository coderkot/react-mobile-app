import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { BottomSheet } from '../../components/bottom-sheet';
import { ListItem } from 'react-native-elements';
import { colors } from '../../main-styles';
import { SvgIcon } from '../../components/svg-icon';
import { CustomButton } from '../../components/common/custom-button';
import DotRed from '../../assets/icons/svg/red-notification-icon.svg';
import { styles } from './styles';
import { NotificationView } from '../../components/common/header-right/notification-view';
import { getErrorObject } from '../../utils/utils';
import {
  requestNotificationMarkAllRead,
  requestNotificationMarkRead,
  requestNotificationsDeleteRead,
} from '../../server/requests';
import { NotificationModel } from '../../server/models/models';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { DateFormat } from '../../constants/format-constants';
import { getNotifications } from '../../redux/thunks';
import { NotificationMessageType } from '../../constants/type-constants';
import { NewsDetailScreen } from '../news/news-detail-screen/news-detail-screen';
import { RequestDetails } from '../requests/details/requestDetails';
import { HelpView } from '../profile/help/help-view';
import { TabActions, useNavigation } from '@react-navigation/native';
import { DocumentDetails } from '../../components/common/DocumentDetails/DocumentDetails';
import { AdminMessageDetail } from '../../components/common/AdminMessageDetail/AdminMessageDetail';
import { ActionsService } from '../../redux/actions';

export const Notifications = React.forwardRef(
  (props: NotificationsProps, ref) => {
    const userNotifications = useSelector<any>(
      (state) => state.userStore.userNotifications
    );
    const [typeNotification, setTypeNotification] =
      useState<NotificationModel>();
    const sheetRef = useRef<any>();
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const navigationViews = new Map<
      string,
      { view: string; valueNavigator: any }
    >();
    navigationViews.set(NotificationMessageType.NEWS, {
      view: 'NewsDetail',
      valueNavigator: 'News',
    });
    navigationViews.set(NotificationMessageType.JOB_APP, {
      view: 'RequestDetail',
      valueNavigator: 'Requests',
    });
    navigationViews.set(NotificationMessageType.NEW_ANSWER, {
      view: 'HelpView',
      valueNavigator: 'Profile',
    });
    navigationViews.set(NotificationMessageType.DOC, {
      view: 'SubItem',
      valueNavigator: 'Job',
    });

    useImperativeHandle(ref, () => ({
      open: () => {
        setTypeNotification(undefined);
        sheetRef?.current?.open();
      },
    }));

    const updateList = () => {
      dispatch(getNotifications());
    };

    const showDescription = (notification: NotificationModel) => {
      setTypeNotification(notification);
    };

    const markAsRead = (id: string) => {
      const notification = (
        userNotifications as Array<NotificationModel>
      )?.find((item) => item.id.toString() === id);
      notification && showDescription(notification);

      if (notification?.unread) {
        requestNotificationMarkRead(id).then((response) => {
          if (response.status === 200 || response.status === 201) {
            updateList();
          }
        });
      }
    };

    const markAllAsRead = () => {
      requestNotificationMarkAllRead().then((response) => {
        if (response.status === 200) {
          updateList();
        } else {
          dispatch(getErrorObject());
        }
      });
    };

    const deleteAllRead = () => {
      requestNotificationsDeleteRead().then((response) => {
        if (response.status === 200) {
          updateList();
        } else {
          dispatch(getErrorObject());
        }
      });
    };

    const getBackground = () =>
      typeNotification
        ? { backgroundColor: colors.white }
        : { backgroundColor: colors.shadeWhite };

    const getView = () => {
      switch (typeNotification?.type) {
        case NotificationMessageType.NEWS:
          return <NewsDetailScreen id={typeNotification?.entityId} />;
        case NotificationMessageType.JOB_APP:
          return <RequestDetails id={typeNotification?.entityId} />;
        case NotificationMessageType.NEW_ANSWER:
          return <HelpView id={typeNotification?.entityId} />;
        case NotificationMessageType.DOC:
          return <DocumentDetails doc={typeNotification} />;
        case NotificationMessageType.ADMIN_MESSAGE:
          return <AdminMessageDetail data={typeNotification} />;
        default:
          return <Text>Ошибка</Text>;
      }
    };

    const goToViews = () => {
      const view = navigationViews.get(
        typeNotification?.type as NotificationMessageType
      );
      const jumpToAction = TabActions.jumpTo(
        view?.valueNavigator,
        getParams(view)
      );

      navigation.dispatch(jumpToAction);
      sheetRef.current?.close();
    };

    const getParams = (view: any) => {
      let result: any = {
        screen: view?.view,
        params: {
          id:
            typeNotification?.type === NotificationMessageType.DOC
              ? typeNotification?.data?.nodeId
              : typeNotification?.entityId,
        },
        initial: false,
      };

      if (typeNotification?.type === NotificationMessageType.DOC) {
        result.params.title = typeNotification.title;
        result.params.fileId = typeNotification.entityId;
      }
      return result;
    };

    const getHeight = () => {
      const height = Dimensions.get('window').height;
      return Platform.OS === 'ios' ? height - 44 : height;
    };

    useEffect(() => {
      const notification = userNotifications as Array<NotificationModel>;
      if (props?.setUnread && notification && notification.some) {
        notification.some((item) => item.unread)
          ? props.setUnread(true)
          : props.setUnread(false);
      }
    }, [props, userNotifications]);

    return (
      <View>
        <BottomSheet
          ref={sheetRef}
          title={'Уведомления'}
          height={getHeight()}
          style={{ backgroundColor: colors.shadeWhite }}
          contentContainerStyle={getBackground()}
          onCloseCallback={() =>
            dispatch({
              type: ActionsService.OPEN_NOTIFICATION_LIST,
              payload: false,
            })
          }
        >
          {!typeNotification &&
            (userNotifications as Array<NotificationModel>) && (
              <>
                <FlatList
                  scrollEnabled={true}
                  scrollToOverflowEnabled={true}
                  showsVerticalScrollIndicator={false}
                  nestedScrollEnabled={true}
                  style={{
                    height: Dimensions.get('window').height - 120,
                    paddingTop: 32,
                    paddingBottom: 32,
                  }}
                  data={userNotifications as Array<NotificationModel>}
                  extraData={userNotifications as Array<NotificationModel>}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      onPress={() => markAsRead(item.id.toString())}
                    >
                      <NotificationView />

                      <ListItem
                        containerStyle={{
                          ...styles.menuItems,
                          marginBottom:
                            index ===
                            (userNotifications as Array<NotificationModel>)
                              .length -
                              1
                              ? 160
                              : 8,
                        }}
                      >
                        <View style={styles.itemContainer}>
                          <View style={styles.createDateContainer}>
                            {item.unread && <DotRed />}
                            <Text style={styles.createDateItem}>
                              {moment(item.createdAt).format(
                                DateFormat.DEFAULT_FORMAT
                              )}
                            </Text>
                          </View>

                          <View style={styles.subContainer}>
                            <Text
                              style={{ flex: 1 }}
                              numberOfLines={1}
                              ellipsizeMode={'tail'}
                            >
                              {item.title}
                            </Text>
                            <SvgIcon color={colors.middleGray} icon={'goto'} />
                          </View>
                        </View>
                      </ListItem>
                    </TouchableOpacity>
                  )}
                />
                <View style={styles.buttonGroup}>
                  <CustomButton
                    title={'Пометить все как прочитанные'}
                    onPress={() => {
                      markAllAsRead();
                    }}
                    styles={styles.button}
                    width={260}
                    titleStyle={{ fontSize: 14 }}
                  />
                  <CustomButton
                    styles={styles.button}
                    width={196}
                    title={'Удалить прочитанные'}
                    titleStyle={{ fontSize: 14 }}
                    onPress={() => {
                      deleteAllRead();
                    }}
                  />
                </View>
              </>
            )}
          {typeNotification && getView()}

          {typeNotification && (
            <>
              <View style={styles.buttonGroup}>
                {typeNotification?.type !==
                  NotificationMessageType.ADMIN_MESSAGE && (
                  <CustomButton
                    title={'Перейти'}
                    onPress={() => goToViews()}
                    styles={styles.button}
                    width={260}
                    titleStyle={{ fontSize: 14 }}
                  />
                )}
                <CustomButton
                  styles={styles.button}
                  width={196}
                  title={'Назад'}
                  titleStyle={{ fontSize: 14 }}
                  onPress={() => setTypeNotification(undefined)}
                />
              </View>
            </>
          )}
        </BottomSheet>
      </View>
    );
  }
);

interface NotificationsProps {
  setUnread?: (value: boolean) => void;
}
