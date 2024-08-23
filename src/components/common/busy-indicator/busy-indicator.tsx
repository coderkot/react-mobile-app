import React from 'react';
import { View } from 'react-native';
// import Spinner from 'react-native-loading-spinner-overlay';

import { BusyIndicatorProps } from './busy-indicator-props';

export const BusyIndicator: React.FC<BusyIndicatorProps> = ({
  visible,
  textContent,
  children,
  style,
}) => {
  return (
    <View
      style={{
        ...style,
      }}
    >
      {/*<Spinner visible={visible} textContent={textContent} />*/}
      {children}
    </View>
  );
};
