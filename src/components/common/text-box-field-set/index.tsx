import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';

export const FieldSet: React.FC<TextBoxFieldSetProps> = (props) => {
  return (
    <View
      style={{
        ...styles.textBoxFieldSetContainer,
        ...props.textBoxFieldSetContainerStyle,
      }}
    >
      <View style={styles.labelFieldSetView}>
        <Text style={{ ...styles.labelFieldSet, ...props.labelFieldSetStyle }}>
          {' '}
          {props.placeholder}{' '}
        </Text>
      </View>
      <View style={styles.mainTextView}>{props.children}</View>
    </View>
  );
};

interface TextBoxFieldSetProps {
  placeholder: string;
  textBoxFieldSetContainerStyle?: any;
  labelFieldSetStyle?: any;
}
