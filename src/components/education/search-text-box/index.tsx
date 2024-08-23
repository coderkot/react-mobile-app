import React from 'react';
import { Platform, ViewStyle } from 'react-native';
import { Icon, SearchBar } from 'react-native-elements';
import { colors } from '../../../main-styles';

export const SearchTextBox: React.FC<SearchTextBoxProps> = (props) => {
  const containerStyle = { ...props.containerStyle };

  return (
    <SearchBar
      containerStyle={containerStyle}
      style={props.style}
      placeholder={props.placeholder ?? 'Поиск'}
      cancelIcon={<Icon name="search" color={colors.gray} />}
      platform={Platform.OS === 'android' ? 'android' : 'ios'}
      onChangeText={props.onChangeText}
      onClear={props?.onClear}
      placeholderTextColor={props.placeholderColor ?? colors.gray}
      defaultValue={''}
      value={props.value ?? ''}
    />
  );
};

interface SearchTextBoxProps {
  containerStyle?: ViewStyle;
  onChangeText?(text: string): void;
  placeholder?: string;
  style?: ViewStyle;
  placeholderColor?: string;
  onClear?(): void;
  value?: string;
}
