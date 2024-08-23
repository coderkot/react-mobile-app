import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  subContainer: {
    height: '40%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  headerContainer: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    width: '100%',
  },
  text: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 21,
    flex: 1,
    textAlign: 'center',
    alignSelf: 'center',
  },
  takePhotoBtn: {
    marginTop: 20,
    width: 180,
    height: 48,
    backgroundColor: '#0075FF',
  },
  selectPhotoBtn: {
    marginTop: 20,
    width: 180,
    height: 48,
    backgroundColor: '#fff',
  },
  btnContainer: {
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  photoContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    width: '100%',
  },
  photoButton: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  camera: {
    flex: 1,
  },
});
