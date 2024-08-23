import React, { useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SvgIcon } from '../../svg-icon';
import { styles } from './styles';
import { colors } from '../../../main-styles';
import { Notifications } from '../../../screens/notifications';
import { getNotifications } from '../../../redux/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useNotificationModal } from '../../../hooks/useNotificationModal';

export const HeaderRight = () => {
  const [isUnread, setUnread] = useState<boolean>(false);
  const modalRef = useRef<any>();
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(getNotifications());
    modalRef.current?.open();
  };

  const openList = useSelector<any>(
    (state) => state.serviceStore.openList
  ) as boolean;

  useNotificationModal(openList, modalRef);

  return (
    <>
      <TouchableOpacity
        style={styles.touchableContainer}
        onPress={handleOpenModal}
      >
        <View style={{ marginRight: 15 }}>
          <SvgIcon
            icon={isUnread ? 'unread-bell' : 'bell'}
            color={colors.middleGray}
            onPress={handleOpenModal}
          />
        </View>
      </TouchableOpacity>

      <Notifications ref={modalRef} setUnread={setUnread} />
    </>
  );
};
