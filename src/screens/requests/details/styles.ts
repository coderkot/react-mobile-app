import { StyleSheet } from 'react-native';
import { colors } from '../../../main-styles';

export const RequestDetailsStyles = StyleSheet.create({
  infoPanelContainer: {
    bottom: 90,
    right: 0,
    left: 0,
    marginLeft: 10,
    marginRight: 10,
    height: 56,
    borderRadius: 8,
    backgroundColor: colors.cream,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  infoPanelText: {
    color: colors.blue,
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 16,
    marginLeft: 5,
  },
  respondBtn: {
    bottom: 90,
    right: 0,
    left: 0,
    width: '50%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  scroll: {
    backgroundColor: colors.white,
  },
});
