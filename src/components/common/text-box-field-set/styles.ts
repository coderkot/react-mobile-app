import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  textBoxFieldSetContainer: {
    borderWidth: 2,
    borderRadius: 8,
    marginTop: 35,
    height: 45,
    borderColor: '#DEDEDE',
  },
  labelFieldSetView: {
    height: 0,
    justifyContent: 'center',
    paddingHorizontal: 11,
    alignItems: 'flex-start',
  },
  labelFieldSet: {
    elevation: 1000,
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 11.4,
  },
  mainTextView: {
    paddingHorizontal: 0,
    margin: 0,
    zIndex: 1,
    paddingTop: 0,
    paddingBottom: 0,
  },
});

export { styles };
