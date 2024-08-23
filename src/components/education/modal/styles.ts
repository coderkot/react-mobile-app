import { StyleSheet } from 'react-native';
import { colors } from '../../../main-styles';

export const styles = StyleSheet.create({
  headerPanel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 30,
    backgroundColor: colors.white,
  },
  headerText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    color: colors.black,
    left: 16,
    right: 16,
    width: '80%',
  },
  childrenWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
  },
  closeIcon: {
    right: 15,
  },
});
