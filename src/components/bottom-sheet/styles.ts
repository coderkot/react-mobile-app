import { StyleSheet } from 'react-native';
import { colors } from '../../main-styles';

export const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 8,
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: colors.veryLightGray,
  },
  headerTitle: {
    alignSelf: 'center',
    fontSize: 18,
    lineHeight: 21,
  },
  contentContainer: {
    paddingHorizontal: 32,
  },
});
