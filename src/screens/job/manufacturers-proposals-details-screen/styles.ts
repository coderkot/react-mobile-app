import { StyleSheet } from 'react-native';
import { colors } from '../../../main-styles';

export const styles = StyleSheet.create({
  textWrapper: {
    backgroundColor: colors.white,
    flex: 1,
    marginTop: 10,
    marginBottom: 40,
  },
  btnStyle: {
    backgroundColor: colors.blue,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: 200,
  },
  btnContainer: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    bottom: 90,
    right: 0,
    left: 0,
    width: '100%',
  },
});
