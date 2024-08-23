import React from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';
import { styles } from './styles';

export const Badge: React.FC<BadgeProps> = (props) => {
  return (
    <View
      style={{
        ...props.containerStyle,
        ...styles.badgeContainer,
        backgroundColor: props.color,
      }}
    >
      <Text style={{ ...props.titleStyle, ...styles.title }}>
        {props.title}
      </Text>
    </View>
  );
};

interface BadgeProps {
  title: string;
  color: string;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
}
