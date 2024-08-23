import { StyleSheet } from 'react-native';
import { colors, MainStyles } from '../../../main-styles';

export const DocumentDetailsStyles = StyleSheet.create({
  itemTitle: {
    ...MainStyles.defaultTextStyle,
    fontSize: 14,
    lineHeight: 26,
    color: colors.gray,
  },
  container: {
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },
  itemSubTitle: {
    ...MainStyles.defaultTextStyle,
    fontSize: 14,
    lineHeight: 26,
    color: colors.darkGray,
    marginBottom: 32,
  },
  dateContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 8,
  },
});
