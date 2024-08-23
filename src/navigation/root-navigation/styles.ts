import { StyleSheet } from 'react-native';
import { colors } from '../../main-styles';

export const LogoStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: colors.whiteGray,
  },
  logoContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: colors.whiteGray,
  },
  logo: {
    position: 'absolute',
    top: '30%',
  },
});
