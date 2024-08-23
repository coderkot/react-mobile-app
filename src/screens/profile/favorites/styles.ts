import { StyleSheet } from 'react-native';
import { colors } from '../../../main-styles';

export const styles = StyleSheet.create({
  controlContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingLeft: 16,
    paddingRight: 16,
  },
  favoriteItem: {
    backgroundColor: colors.white,
    marginBottom: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  favoriteTitle: {
    fontSize: 16,
    lineHeight: 26,
    maxWidth: '90%',
  },
  searchContainer: {
    marginLeft: 16,
    marginRight: 15,
    marginVertical: 16,
    borderRadius: 8,
    backgroundColor: colors.cream,
  },
});
