import { StyleSheet } from 'react-native';
import { colors } from '../../main-styles';

export const styles = StyleSheet.create({
  badgeContainer: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  title: {
    color: colors.white,
    fontSize: 12,
    lineHeight: 12,
    width: 64,
    textAlign: 'center',
  },
});
