import { colors } from '../../../../main-styles';
import { StyleSheet } from 'react-native';

export const OfflineStyles = StyleSheet.create({
  header: {
    width: '100%',
    backgroundColor: colors.white,
    paddingTop: 20,
    paddingBottom: 15,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 23,
    fontWeight: '700',
    color: colors.darkGray,
  },
});
