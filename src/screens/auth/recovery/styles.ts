import { StyleSheet } from 'react-native';
import { colors, MainStyles } from "../../../main-styles";

export const RecoveryStyles = StyleSheet.create({
  loginContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subHeader: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 20,
    textAlign: 'center',
    color: '#000',
    marginTop: 15,
    marginBottom: 15,
  },
  phoneTextBoxContainerStyle: {
    width: '80%',
  },
  passwordTextBoxContainerStyle: {
    width: '80%',
  },
  input: {
    borderWidth: 2,
    borderColor: colors.veryLightGray,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: colors.white,
  },
  formContainer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    width: '100%',
  },
  phoneView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    ...MainStyles.defaultButtonStyle,
    paddingHorizontal: 8,
  },
});
