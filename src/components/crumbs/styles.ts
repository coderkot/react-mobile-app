import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  scrollViewStyle: {
    maxWidth: Dimensions.get('screen').width - 15,
    marginTop: 16,
    marginLeft: 16,
    marginRight: 15,
  },
  containerStyle: {
    flexDirection: 'row',
  },
  textStyle: {
    maxWidth: 100,
    fontSize: 14,
    lineHeight: 22,
    minHeight: 26,
  },
});
