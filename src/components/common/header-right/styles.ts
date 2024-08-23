import { StyleSheet } from 'react-native';
import { colors } from '../../../main-styles';

export const styles = StyleSheet.create({
  touchableContainer: {
    height: '100%',
    width: 50,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  dateOnView: {
    fontSize: 14,
    lineHeight: 26,
    color: colors.gray,
    marginVertical: 8,
    marginRight: 15,
    alignSelf: 'flex-end',
  },
  descriptionOnView: {
    marginLeft: 16,
    marginBottom: 32,
  },
  descriptionTitleOnView: {
    marginBottom: 8,
    fontSize: 16,
    lineHeight: 26,
    color: colors.gray,
  },
  descriptionTextOnView: {
    fontSize: 14,
    lineHeight: 24,
    color: colors.darkGray,
  },
  controlContainerOnView: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignSelf: 'flex-end',
  },
  buttonOnView: {
    backgroundColor: colors.blue,
    borderRadius: 8,
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  buttonContainerOnView: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
  },
});
