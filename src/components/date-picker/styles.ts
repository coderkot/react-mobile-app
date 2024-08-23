import { StyleSheet } from 'react-native';
import { colors } from '../../main-styles';

export const styles = StyleSheet.create({
  viewStyle: {
    height: 48,
  },
  labelStyle: {
    fontSize: 12,
    backgroundColor: colors.white,
    paddingHorizontal: 0,
    marginHorizontal: 0,
    paddingLeft: 3,
  },
  inputStyle: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: colors.veryLightGray,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  inputContainerStyle: {
    borderBottomWidth: 0,
  },
  containerStyle: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    height: 48,
  },
  rightIconContainerStyle: {
    position: 'absolute',
    right: 16,
  },
});
