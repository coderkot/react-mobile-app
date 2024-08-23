import { StyleSheet } from 'react-native';
import { colors, MainStyles } from '../../../main-styles';

export const LoginStyles = StyleSheet.create({
  loginContainer: {
    alignItems: 'center',
  },
  subHeader: {
    ...MainStyles.defaultTextStyle,
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 18,
  },

  formContainer: {
    marginTop: 46,
    width: '100%',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: colors.veryLightGray,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: colors.white,
  },
  inputContainer: {
    paddingHorizontal: 50,
  },
});
