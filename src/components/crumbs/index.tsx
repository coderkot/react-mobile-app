import React, { useRef } from 'react';
import { ScrollView, Text, TextStyle, ViewStyle } from 'react-native';
import { styles } from './styles';
import { colors } from '../../main-styles';

export const Crumbs: React.FC<CrumbsProps> = (props) => {
  const scrollViewRef = useRef<any>();

  return (
    <ScrollView
      style={[styles.scrollViewStyle, props.style]}
      contentContainerStyle={[styles.containerStyle, props.containerStyle]}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      ref={scrollViewRef}
      onContentSizeChange={() =>
        scrollViewRef.current.scrollToEnd({ animated: true })
      }
    >
      {props.crumbs.map((item, index) =>
        index !== props.crumbs.length - 1 ? (
          <>
            <Text
              numberOfLines={1}
              ellipsizeMode={'middle'}
              style={[
                styles.textStyle,
                props.crumbTitleStyle,
                { color: colors.blue },
              ]}
              key={`path-${index}`}
              onPress={item.onPress}
            >
              {item.name}
            </Text>
            <Text key={index}> / </Text>
          </>
        ) : (
          <Text
            numberOfLines={1}
            ellipsizeMode={'middle'}
            style={[styles.textStyle, props.crumbTitleStyle]}
            key={`path-${index}`}
          >
            {item.name}
          </Text>
        )
      )}
    </ScrollView>
  );
};

export interface CrumbsProps {
  crumbs: Array<{
    path?: string;
    name?: string;
    id?: string;
    onPress?: () => void;
  }>;
  containerStyle?: ViewStyle;
  style?: ViewStyle;
  crumbTitleStyle?: TextStyle;
}
