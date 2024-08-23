import { Platform, StyleSheet } from 'react-native';
import { colors } from '../../main-styles';

export const SheetStyles = StyleSheet.create({
  modalLabel: {
    fontSize: 12,
    backgroundColor: colors.white,
    paddingHorizontal: 0,
    marginHorizontal: 0,
    paddingLeft: 3,
  },
  modalContainer: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    maxHeight: 65,
    marginBottom: 16,
  },
  inputStyle: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: colors.veryLightGray,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  inputContainerStyle: {
    borderBottomWidth: 0,
  },
  modalButton: {
    marginTop: 32,
    marginBottom: 16,
    borderRadius: 8,
    alignSelf: 'center',
    paddingHorizontal: 36,
    paddingVertical: 16,
    backgroundColor: colors.blue,
  },
  modalCancel: {
    alignSelf: 'center',
    marginBottom: 32,
  },
  pickerContainer: {
    borderWidth: 2,
    borderColor: colors.veryLightGray,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 16,
  },
  picker: {
    height: 50,
    padding: Platform.OS === 'ios' ? 15 : 0,
    width: '100%',
  },
});
