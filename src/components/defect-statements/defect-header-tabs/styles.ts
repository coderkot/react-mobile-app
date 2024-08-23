import { StyleSheet } from 'react-native';
import { MainStyles } from '../../../main-styles';

export const DefectTabStyles = StyleSheet.create({
  tabItemContainerActive: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    maxWidth: 150,
    minWidth: 150,
    paddingTop: 10,
  },
  tabItemContainerNotActive: {
    backgroundColor: '#ECECEC',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    minWidth: 150,
    maxWidth: 150,
    paddingTop: 10,
  },
  tabItemTitle: {
    ...MainStyles.defaultTextStyle,
    textTransform: 'none',
    fontSize: 14,
    lineHeight: 16,
    textAlign: 'center',
  },
});
