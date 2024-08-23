import { StyleSheet } from 'react-native';
import { colors, MainStyles } from '../../../main-styles';

export const SignUpStyles = StyleSheet.create({
  signupContainer: {
    width: '100%',
    alignItems: 'center',
  },
  subHeader: {
    ...MainStyles.defaultTextStyle,
    fontSize: 20,
    marginVertical: 18,
  },
  phoneTextBoxContainerStyle: {
    width: '80%',
  },
  passwordTextBoxContainerStyle: {
    width: '80%',
  },
  agreementText: {
    ...MainStyles.defaultTextStyle,
    fontSize: 14,
    lineHeight: 16,
    color: colors.gray,
  },
  registrationBtn: {
    ...MainStyles.defaultButtonStyle,
    marginTop: 30,
    paddingHorizontal: 12,
  },
  formContainer: {
    marginTop: -50,
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
