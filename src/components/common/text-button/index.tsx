import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

export const TextButton: React.FC<TextButtonProps> = (props) => {
  return (
    <TouchableOpacity disabled={props.disabled} onPress={props.onPress}>
      <Text
        style={{
          ...styles.textButton,
          ...props.style,
        }}
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

interface TextButtonProps {
  style?: any;
  disabled?: boolean;
  text: string;
  onPress?: () => void;
}
