import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  loginContainer: {
    width: '100%',
    alignItems: 'center',
    padding: 10,
  },
  subHeader: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 20,
    textAlign: 'center',
    color: '#000',
    marginBottom: 15,
    marginTop: 30,
  },
  phoneTextBoxContainerStyle: {
    width: '80%',
  },
  passwordTextBoxContainerStyle: {
    width: '80%',
  },
  agreementText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 16,
    color: '#999999',
  },
  registrationBtn: {
    width: 200,
    marginTop: 30,
  },
});

export { styles };
