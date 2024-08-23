import React from 'react';
import { Input } from 'react-native-elements';
import { styles } from './styles';
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';

export const TextBox: React.FC<TextBoxProps> = (props) => {
  return (
    <Input
      onEndEditing={props.onEndEditing}
      disabled={props.disabled}
      placeholder={props.placeholder}
      errorMessage={props.errorMessage}
      multiline={props.multiline}
      containerStyle={{
        ...styles.passwordTextBoxContainerStyle,
        ...props.containerStyle,
      }}
      inputContainerStyle={{
        ...styles.passwordTextBoxInputContainerStyle,
        ...props.inputContainerStyle,
      }}
      inputStyle={{ ...styles.passwordTextBoxInputStyle, ...props.inputStyle }}
      placeholderTextColor={props.placeholderTextColor ?? '#DEDEDE'}
      onChangeText={props.onChangeText}
      onBlur={props.onBlur}
      value={props.value}
      secureTextEntry={props.secureTextEntry}
      rightIconContainerStyle={props.rightIconContainerStyle}
      rightIcon={props.rightIcon}
      disabledInputStyle={props.disabledInputStyle}
      keyboardType={props.keyBoardType}
    />
  );
};

interface TextBoxProps {
  onEndEditing?: () => void;
  placeholder: string;
  placeholderTextColor?: string;
  errorMessage?: string;
  containerStyle?: any;
  inputContainerStyle?: any;
  inputStyle?: any;
  onChangeText?: (text: string, rawText?: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  value?: string;
  disabled?: boolean;
  secureTextEntry?: boolean;
  rightIcon?: any;
  rightIconContainerStyle?: any;
  disabledInputStyle?: any;
  multiline?: boolean;
  keyBoardType?: KeyboardTypeOptions;
}
