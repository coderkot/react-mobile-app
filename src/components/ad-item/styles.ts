import { StyleSheet } from 'react-native';
import { colors, MainStyles } from '../../main-styles';

export const AdItemStyles = StyleSheet.create({
  wrapNewsProps: {
    width: '100%',
  },

  newsItem: {
    borderRadius: 20,
  },
  headerText: {
    ...MainStyles.defaultTextStyle,
    fontSize: 20,
    marginBottom: 10,
  },
  subHeaderWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  subHeaderText: {
    ...MainStyles.defaultTextStyle,
    fontSize: 14,
    lineHeight: 26,
    color: colors.darkGray,
  },
  moreDetailsBtn: {
    backgroundColor: colors.blue,
    borderRadius: 8,
    alignSelf: 'flex-end',
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginVertical: 16,
  },
  methodAndSubmethod: {
    ...MainStyles.defaultTextStyle,
    fontSize: 14,
    lineHeight: 26,
    color: colors.darkGray,
    marginBottom: 10,
  },
  date: {
    ...MainStyles.defaultTextStyle,
    fontSize: 14,
    lineHeight: 26,
    color: colors.gray,
    marginVertical: 8,
    alignSelf: 'flex-end',
  },
});
