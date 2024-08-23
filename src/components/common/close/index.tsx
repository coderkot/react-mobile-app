import React from 'react';
import { GestureResponderEvent, Image, TouchableOpacity } from 'react-native';

import plus from '../../../assets/icons/png/close.png';
import { styles } from './styles';

export const Close: React.FC<CloseProps> = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        ...styles.container,
        ...props.containerStyle,
      }}
    >
      <Image source={plus} />
    </TouchableOpacity>
  );
};

interface CloseProps {
  onPress?: (event: GestureResponderEvent) => void;
  containerStyle?: any;
}
