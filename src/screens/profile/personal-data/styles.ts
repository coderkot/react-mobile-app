import { StyleSheet } from 'react-native';
import { colors } from '../../../main-styles';

export const PersonalDataStyles = StyleSheet.create({
  personalDataTitle: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 18,
    color: colors.darkGray,
  },

  personalDataContainer: {
    marginTop: 14,
    marginBottom: 24,
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingBottom: 35,
  },

  form: {
    marginBottom: 32,
  },

  personalDataField: {
    marginRight: 15,
    marginLeft: 16,
    borderWidth: 0,
    borderRadius: 8,
  },

  personalDataInput: {
    borderWidth: 2,
    borderColor: colors.veryLightGray,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    width: 280,
    height: 48,
    backgroundColor: colors.shadeWhite,
  },

  personalDataInputDisabled: {
    color: colors.gray,
    backgroundColor: colors.veryLightGray,
    padding: 12,
    height: 48,
  },

  changePassword: {
    backgroundColor: colors.blue,
    borderRadius: 8,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarContainer: {
    marginTop: 0,
    marginBottom: 31,
    alignSelf: 'center',
    height: 'auto',
    width: 150,
  },

  avatar: {
    width: 104,
    height: 104,
    borderWidth: 2,
    borderRadius: 100,
    borderColor: colors.blue,
    alignSelf: 'center',
  },

  closeIcon: {
    left: 115,
    top: 25,
    width: 26,
    zIndex: 9999,
  },
  buttonForm: {
    width: '100%',
    alignItems: 'center',
    marginTop: 16,
  },
  load: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
  },
});
