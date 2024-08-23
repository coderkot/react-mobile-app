import { StyleSheet } from 'react-native';
import { colors } from '../../main-styles';

export const SubItemStyles = StyleSheet.create({
  itemContainer: {
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  itemTitle: {
    fontSize: 16,
    lineHeight: 26,
    color: colors.black,
  },
  searchBar: {
    marginHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  searchContainer: {
    borderRadius: 8,
    marginTop: 16,
    marginLeft: 16,
    marginRight: 15,
    backgroundColor: '#ececec',
    padding: 0,
  },
  searchResults: {
    marginLeft: 16,
    marginTop: 16,
    color: colors.darkGray,
  },
});
