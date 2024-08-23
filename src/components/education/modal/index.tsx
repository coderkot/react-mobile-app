import React, { useImperativeHandle, useState } from 'react';
import { Modal as RnModal, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { styles } from './styles';
import { colors } from '../../../main-styles';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Modal = React.forwardRef((props: ModalProps, modalRef) => {
  const [visible, setVisible] = useState<boolean>(false);

  useImperativeHandle(modalRef, () => ({
    openModal: () => setVisible(true),
    closeModal: () => setVisible(false),
  }));

  return (
    <RnModal
      visible={visible}
      animationType="slide"
      onRequestClose={() => setVisible(false)}
      presentationStyle={'overFullScreen'}
      supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={styles.headerPanel}>
            <Text
              style={{ ...styles.headerText, ...props.titleTextStyle }}
              numberOfLines={1}
            >
              {props.title}
            </Text>
            <Icon
              name="close"
              color={colors.black}
              size={25}
              onPress={props.onClose}
              containerStyle={styles.closeIcon}
            />
          </View>
          <View
            style={{
              ...styles.childrenWrapper,
              ...props.childrenContainerStyle,
            }}
          >
            {props.children}
          </View>
        </View>
      </SafeAreaView>
    </RnModal>
  );
});

interface ModalProps {
  onClose: () => void;
  title: string;
  titleTextStyle?: any;
  childrenContainerStyle?: any;
  children?: React.ReactNode;
}
