import { StyleSheet } from 'react-native';
import { colors, MainStyles } from '../../../main-styles';

export const AdminMessageStyle = StyleSheet.create({
  container: {
    paddingBottom: 100,
    paddingTop: 8,
  },
  date: {
    alignSelf: 'flex-end',
    ...MainStyles.defaultTextStyle,
    fontSize: 14,
    lineHeight: 26,
    color: colors.gray,
    marginBottom: 32,
  },
  title: {
    alignSelf: 'flex-start',
    ...MainStyles.defaultTextStyle,
    fontSize: 14,
    lineHeight: 26,
    color: colors.gray,
    marginBottom: 8,
  },
  message: {
    alignSelf: 'flex-start',
    ...MainStyles.defaultTextStyle,
    fontSize: 14,
    lineHeight: 24,
    color: colors.darkGray,
    marginBottom: 8,
  },
});
