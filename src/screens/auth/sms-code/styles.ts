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
    marginTop: 50,
    marginBottom: 15,
  },
  phoneTextBoxContainerStyle: {
    width: '80%',
  },
  passwordTextBoxContainerStyle: {
    width: '80%',
  },
  root: {
    padding: 20,
    minHeight: 300,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
  },
  fieldRow: {
    marginTop: 20,
    flexDirection: 'row',
    marginLeft: 8,
  },
  cell: {
    width: 55,
    height: 55,
    lineHeight: 55,
    fontSize: 30,
    fontWeight: 'normal',
    textAlign: 'center',
    marginLeft: 8,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#ECECEC',
    backgroundColor: '#fff',
  },
  toggle: {
    width: 55,
    height: 55,
    lineHeight: 55,
    fontSize: 24,
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#0075ff',
  },
  digitStyle: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    width: 'auto',
    height: 'auto',
  },
  digitTxtStyle: {
    color: '#999',
    fontWeight: '100',
    lineHeight: 16,
  },
  separatorStyle: {
    color: '#999',
  },
  countDownWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countDownText: {
    color: '#999',
    lineHeight: 16,
  },
});

export { styles };
