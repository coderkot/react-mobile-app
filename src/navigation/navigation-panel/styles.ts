import { Platform, StyleSheet } from 'react-native';
import { colors } from '../../main-styles';

export const styles = StyleSheet.create({
  barStyle: {
    backgroundColor: Platform.OS == 'ios' ? colors.whiteGray : '#fafafa',
    borderRadius: 8,
    padding: 2,
    marginBottom: Platform.OS == 'ios' ? 0 : 10,
    marginRight: Platform.OS == 'ios' ? 0 : 10,
    marginLeft: Platform.OS == 'ios' ? 0 : 10,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    position: 'absolute',
    height: Platform.OS == 'ios' ? 60 : 'auto',
  },
});
