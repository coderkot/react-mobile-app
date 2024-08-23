import { Platform, StyleSheet } from 'react-native';
import { colors } from '../../main-styles';

export const ProfileStyles = StyleSheet.create({
  menuItems: {
    marginBottom: 8,
    marginRight: 15,
    marginLeft: 16,
    borderRadius: 8,
  },
  menuTitle: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 26,
    alignSelf: 'flex-start',
    marginLeft: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
  },

  exitButton: {
    backgroundColor: colors.blue,
    width: 160,
    height: 48,
    marginBottom: 90,
    borderRadius: 8,
    alignSelf: 'center',
  },

  // CV
  idTitle: {
    fontSize: 16,
    lineHeight: 26,
    color: colors.black,
  },
  idDate: {
    fontSize: 14,
    lineHeight: 26,
    color: colors.gray,
  },
  controlMethodTitle: {
    fontSize: 14,
    color: colors.gray,
    lineHeight: 26,
  },
  controlMethodValue: {
    fontSize: 14,
    lineHeight: 26,
    color: colors.darkGray,
  },
  pickerContainer: {
    borderWidth: 2,
    borderColor: colors.veryLightGray,
    borderRadius: 8,
    width: '85%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  picker: {
    height: 50,
    width: '100%',
    padding: Platform.OS === 'ios' ? 15 : 0,
  },
  datesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56,
    marginBottom: 16,
  },
  qualityLabel: {
    fontSize: 12,
    backgroundColor: colors.white,
    paddingHorizontal: 0,
    marginHorizontal: 0,
    paddingLeft: 3,
  },
  qualityContainer: {
    width: '47%',
    paddingHorizontal: 0,
    paddingVertical: 0,
    height: 48,
  },
  aboutLabel: {
    fontSize: 12,
    backgroundColor: colors.white,
    paddingHorizontal: 0,
    marginHorizontal: 0,
    paddingLeft: 3,
  },
  aboutContainer: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    maxHeight: 164,
    marginBottom: 16,
  },
  additionalLabel: {
    fontSize: 12,
    backgroundColor: colors.white,
    paddingHorizontal: 0,
    marginHorizontal: 0,
    paddingLeft: 3,
  },
  additionalContainer: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    maxHeight: 124,
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

  // Notifications
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    marginTop: 23,
  },
  notificationHeaderTitle: {
    color: colors.darkGray,
    fontSize: 18,
    lineHeight: 21,
    opacity: 0.5,
  },
  notificationsContainer: {
    paddingLeft: 16,
    paddingTop: 24,
    paddingBottom: 8,
    backgroundColor: colors.white,
    borderRadius: 8,
    marginTop: 12,
  },
  notificationsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  notificationsItemTitle: {
    color: colors.black,
    fontSize: 16,
    lineHeight: 26,
  },

  // Subscribe
  subscribeContainer: {
    backgroundColor: colors.white,
    borderRadius: 8,
    marginTop: 24,
    marginLeft: 16,
    marginRight: 15,
    marginBottom: 40,
    paddingHorizontal: 42,
    paddingTop: 80,
    paddingBottom: 185,
  },
  subscribeDateContainer: {
    marginBottom: 8,
  },
  subscribeDateTitle: {
    color: colors.black,
    fontSize: 18,
    lineHeight: 22,
    alignSelf: 'center',
    marginBottom: 8,
  },
  subscribeDate: {
    color: colors.middleGray,
    fontSize: 18,
    lineHeight: 18,
    alignSelf: 'center',
  },
  daysLeftContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  daysLeftTitle: {
    color: colors.black,
    fontSize: 18,
    lineHeight: 22,
  },
  daysLeft: {
    color: colors.middleGray,
    fontSize: 18,
    lineHeight: 22,
    marginLeft: 8,
  },
  warningMessageContainer: {
    marginTop: 64,
    alignSelf: 'center',
  },
  warningMessage: {
    color: colors.black,
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
  },
  subscribeButton: {
    backgroundColor: colors.blue,
    paddingHorizontal: 24,
    paddingVertical: 16,
    alignSelf: 'center',
    borderRadius: 8,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
});
