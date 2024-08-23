import { StyleSheet } from 'react-native';
import { colors, MainStyles } from '../../../main-styles';

export const DefectStyles = StyleSheet.create({
  inputContainer: {
    backgroundColor: colors.white,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 40,
    borderRadius: 8,
  },
  tabItemTitle: {
    color: colors.black,
    textTransform: 'none',
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 16,
    textAlign: 'center',
    fontStyle: 'normal',
  },
  tabItemContainerActive: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    maxWidth: 150,
    paddingTop: 10,
  },
  tabItemContainerNotActive: {
    backgroundColor: colors.cream,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    maxWidth: 150,
    paddingTop: 10,
  },
  container: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: colors.shadeWhite,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginBottom: 102,
  },
  tabViewItem: {
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
    backgroundColor: colors.white,
  },
  photoText: {
    ...MainStyles.defaultTextStyle,
    lineHeight: 19,
    color: colors.darkGray,
  },
  photoButtonsContainer: {
    marginTop: 24,
  },
  galleryButton: {
    ...MainStyles.defaultButtonStyle,
    backgroundColor: 'transparent',
    paddingHorizontal: 8,
    alignSelf: 'center',
  },
  cameraButton: {
    ...MainStyles.defaultButtonStyle,
    paddingHorizontal: 8,
    alignSelf: 'center',
  },
  photoSection: {
    marginTop: 22,
  },
  photoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 15,
    paddingBottom: 14,
  },
  photoContainer: {
    height: 80,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    textAlign: 'left',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 19,
    color: colors.darkGray,
  },
  titleContainer: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  textBoxInputStyle: {
    borderWidth: 0,
    height: 96,
  },
  sendBtn: {
    ...MainStyles.defaultButtonStyle,
    marginTop: 20,
    paddingHorizontal: 30,
  },
  close: {
    paddingRight: 0,
    marginBottom: 5,
  },
});

export const DefectModalStyles = StyleSheet.create({
  sendBtn: {
    marginTop: 20,
    width: 160,
    height: 48,
    backgroundColor: colors.blue,
    borderRadius: 8,
  },
  cancelBtn: {
    marginTop: 20,
    width: 160,
    height: 48,
    backgroundColor: colors.white,
  },
  userEmail: {
    borderWidth: 0,
    backgroundColor: colors.shadeWhite,
  },
});
