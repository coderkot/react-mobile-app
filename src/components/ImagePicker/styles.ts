import { StyleSheet } from 'react-native';
import { colors } from '../../main-styles';

export const ImagePickerStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingVertical: 8,
  },
  scrollContainer: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  imageContainer: {
    marginRight: 8,
    alignItems: 'flex-end',
  },
  image: {
    borderRadius: 8,
    marginTop: 5,
    width: 100,
    height: 100,
  },
});
