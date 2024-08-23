import { StyleSheet } from 'react-native';
import { colors } from '../../main-styles';

export const styles = StyleSheet.create({
  wrapNewsProps: {
    marginTop: 8,
    width: '100%',
  },

  newsItem: {
    borderRadius: 20,
  },
  wrapNewsDate: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  newsDateText: {
    marginLeft: 15,
    lineHeight: 26,
    fontSize: 14,
    color: colors.gray,
  },
  headerText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 20,
    color: colors.black,
    marginBottom: 10,
  },
  subHeaderWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  subHeaderText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 26,
    color: colors.darkGray,
  },
  moreDetailsBtn: {
    alignSelf: 'flex-end',
    backgroundColor: colors.blue,
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginVertical: 16,
  },
});
