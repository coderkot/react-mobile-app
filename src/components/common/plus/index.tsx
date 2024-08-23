import React from 'react';
import { GestureResponderEvent, Image, TouchableOpacity } from 'react-native';
import AddIcon from '../../../assets/icons/svg/add-button-icon.svg';
import { styles } from './styles';

export const Plus: React.FC<PlusProps> = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        ...styles.container,
        ...props.containerStyle,
      }}
      disabled={props.disabled}
    >
      <AddIcon />
    </TouchableOpacity>
  );
};

interface PlusProps {
  onPress?: (event: GestureResponderEvent) => void;
  containerStyle?: any;
  disabled?: boolean;
}
