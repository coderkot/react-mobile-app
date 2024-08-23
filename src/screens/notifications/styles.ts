import { StyleSheet } from 'react-native';
import { colors } from '../../main-styles';

export const styles = StyleSheet.create({
  menuItems: {
    marginBottom: 8,
    borderRadius: 8,
    height: 88,
    paddingVertical: 0,
  },
  itemTitle: {
    fontSize: 14,
    lineHeight: 24,
    color: colors.black,
  },
  itemContainer: {
    width: '100%',
    height: '100%',
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  createDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 14,
    marginTop: 8,
  },
  createDateItem: {
    marginLeft: 8,
    fontSize: 14,
    color: colors.gray,
    lineHeight: 16.41,
  },
  buttonGroup: {
    position: 'absolute',
    bottom: 8,
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
  },
  button: {
    backgroundColor: colors.blue,
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginTop: 16,
  },
});
