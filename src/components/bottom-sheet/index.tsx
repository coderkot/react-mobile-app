import React, { ReactNode } from 'react';
import { Text, View, ViewStyle } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { styles } from './styles';

export const BottomSheet = React.forwardRef((props: BottomSheetProps, ref) => {
  return (
    <RBSheet
      ref={ref}
      closeOnDragDown={props.closeOnDragDown ?? true}
      closeOnPressBack={true}
      closeOnPressMask={true}
      animationType={'slide'}
      customStyles={{
        container: {
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          ...props.style,
        },
      }}
      height={props.height ?? 260}
      onClose={props?.onCloseCallback}
    >
      <View style={{ marginBottom: 132 }}>
        {!!props.title && (
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>{props.title}</Text>
          </View>
        )}

        <View
          style={{ ...styles.contentContainer, ...props.contentContainerStyle }}
        >
          {props.children}
        </View>
      </View>
    </RBSheet>
  );
});

interface BottomSheetProps {
  onCloseCallback?: any;
  title?: string;
  children?: ReactNode;
  height?: number;
  style?: ViewStyle;
  closeOnDragDown?: boolean;
  contentContainerStyle?: ViewStyle;
}
