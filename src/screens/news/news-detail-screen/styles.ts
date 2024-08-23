import { StyleSheet } from 'react-native';
import { colors } from '../../../main-styles';

export const NewsViewStyles = StyleSheet.create({
  btnWrapper: {
    position: 'absolute',
    bottom: 90,
    right: 0,
    left: 0,
    marginLeft: 10,
    marginRight: 10,
    height: 56,
    borderRadius: 8,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  textWrapper: {
    marginTop: 10,
    backgroundColor: colors.white,
    flex: 1,
    marginBottom: 110,
  },
  button: {
    backgroundColor: colors.blue,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
});
