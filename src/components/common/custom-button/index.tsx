import React from 'react';
import { Button } from 'react-native-elements';
import { TextStyle, ViewStyle } from 'react-native';

export const CustomButton: React.FC<CustomButtonProps> = (props) => {
  const style = {
    ...props.styles,
    width: props.width ?? 'auto',
    height: props.height ?? 'auto',
  };

  return (
    <Button
      title={props.title}
      onPress={props.onPress}
      buttonStyle={style}
      titleStyle={{ ...(props.titleStyle ?? {}) }}
    />
  );
};

interface CustomButtonProps {
  title: string;
  width?: number;
  height?: number;
  onPress?: (event: React.SyntheticEvent) => void;
  styles?: ViewStyle;
  titleStyle?: TextStyle;
}
