import React from 'react';
import { Text, View } from 'react-native';
import Smile from '../../assets/icons/svg/smile-icon.svg';
import { Button } from 'react-native-elements';
import { SuccessViewStyles } from './styles';
import { MainStyles } from '../../main-styles';

export const SuccessView: React.FC<SuccessViewProps> = (props) => {
  return (
    <View style={SuccessViewStyles.container}>
      <Smile />
      <Text style={{ marginTop: 16, marginBottom: 32 }}>{props.title}</Text>
      <Button
        buttonStyle={
          (MainStyles.defaultButtonStyle, { width: 160, height: 48 })
        }
        onPress={() => props.close()}
        title={'Закрыть'}
      />
    </View>
  );
};

interface SuccessViewProps {
  title: string;
  close: Function;
}
