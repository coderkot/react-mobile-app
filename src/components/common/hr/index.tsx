import React from 'react';
import { View, ViewStyle } from 'react-native';
import { styles } from './styles';

export const Hr: React.FC<HrProps> = (props) => {
  return (
    <View
      style={{
        ...styles.container,
        ...props.style,
      }}
    />
  );
};

interface HrProps {
  style?: ViewStyle;
}
