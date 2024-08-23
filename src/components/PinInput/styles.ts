import { StyleSheet } from 'react-native';
import { colors } from '../../main-styles';

export const PinInputStyles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlContainer: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: 40,
    borderTopColor: colors.cream,
    borderTopWidth: 1,
    marginTop: 53,
    paddingTop: 24,
    width: '100%',
  },
  pinInput: {
    width: 40,
    height: 48,
    borderRadius: 8,
    borderColor: colors.veryLightGray,
    borderStyle: 'solid',
    borderWidth: 2,
  },
  pinSelected: {
    width: 40,
    height: 48,
    borderRadius: 8,
    borderColor: colors.blue,
    borderStyle: 'solid',
    borderWidth: 2,
  },
});
