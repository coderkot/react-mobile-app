import { StyleSheet } from 'react-native';

export const colors = {
  red: '#FF002C',
  lightRed: '#ff4162',
  blue: '#0075FF',
  lightBlue: '#D9EAFF',
  black: '#000000',
  darkGray: '#333333',
  middleGray: '#666666',
  gray: '#999999',
  lightGray: '#C4C4C4',
  veryLightGray: '#DEDEDE',
  cream: '#ECECEC',
  whiteGray: '#F2F2F2',
  shadeWhite: '#F5F5F5',
  white: '#FFFFFF',
  yellow: '#FFBD00',
  lightYellow: '#fdd648',
  green: '#2DA771',
  lightGreen: '#98e1c1',
};

export const MainStyles = StyleSheet.create({
  headerStyles: {
    borderRadius: 8,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },

  defaultTextStyle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    color: colors.black,
  },

  defaultButtonStyle: {
    backgroundColor: colors.blue,
    borderRadius: 8,
    paddingVertical: 16,
  },
});
