import { StyleSheet } from 'react-native';
import { colors } from '../../main-styles';

export const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
    marginLeft: 16,
    marginRight: 15,
    alignItems: 'center',
  },

  sectionTitle: {
    color: colors.darkGray,
    fontSize: 16,
    lineHeight: 18.75,
  },

  section: {
    borderRadius: 8,
    backgroundColor: colors.white,
    paddingLeft: 16,
    paddingRight: 15,
    paddingTop: 16,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
