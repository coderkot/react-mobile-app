import { StyleSheet } from 'react-native';
import { colors, MainStyles } from '../../../main-styles';

export const DefectListStyles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  buttonTitle: {
    ...MainStyles.defaultTextStyle,
    fontSize: 14,
    lineHeight: 16,
    color: colors.white,
  },
  button: {
    paddingHorizontal: 21,
    paddingVertical: 16,
    backgroundColor: colors.blue,
    borderRadius: 8,
  },
  searchBar: {
    margin: 10,
    borderRadius: 8,
  },
});
