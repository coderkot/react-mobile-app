import React, { useEffect, Fragment, useRef, useState } from 'react';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { NavigationPanel } from '../navigation-panel';
import { AuthNavigator } from '../auth';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActionsService, ActionsUser } from '../../redux/actions';
import { LoggedIn } from '../../constants/text-constants';
import { getJobRequestsDictionary, getUserProfile } from '../../redux/thunks';
import { BackHandler, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NetInfo from '@react-native-community/netinfo';
import LogoWithText from '../../assets/images/logo-with-text.svg';
import { LogoStyles } from './styles';
import { useNotificationUpdate } from '../../hooks/useNotificationUpdate';
import { LicenseBottomSheet } from '../../components/LicenseBottomSheet';

export const AppNavigator = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const currentUser = useSelector((state: RootState) => state.userStore);
  const dispatch = useDispatch();
  const offlineMode = useSelector<any>(
    (state) => state.serviceStore.offlineMode
  );
  const navigationRef = useRef();
  const [someState, setSomeState] = useState<any>(null);
  const [backHandlerListener, setBackHandlerListener] = useState<any>(null);

  useNotificationUpdate();

  useEffect(() => {
    AsyncStorage.getItem('isLoggedIn').then((logged) => {
      if (logged === LoggedIn) {
        dispatch({ type: ActionsUser.USER_LOGIN, payload: true });
        dispatch(getUserProfile());
        dispatch(getJobRequestsDictionary());
      }

      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const backAction = () => {
      const navigation: any = navigationRef.current;

      if (offlineMode) {
        return true;
      }

      if (navigation && navigation.canGoBack()) {
        navigation.goBack();
        // хак для обновления фокуса на табе
        setSomeState(new Date());
        return true;
      }

      return false;
    };

    if (backHandlerListener) {
      backHandlerListener.remove();
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    setBackHandlerListener(backHandler);

    return () => {
      backHandler.remove();
    };
  }, [offlineMode]);

  useEffect(() => {
    const navigation: any = navigationRef.current;
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isInternetReachable !== null) {
        const isOffline = !state.isInternetReachable;
        dispatch({
          type: ActionsService.OFFLINE_MODE,
          payload: isOffline,
        });

        if (isOffline) {
          const jumpToAction = TabActions.jumpTo('Profile', {
            screen: 'Favorites',
            initial: false,
          });
          setTimeout(() => navigation.dispatch(jumpToAction));
        }
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Fragment>
        <SafeAreaView style={{ flex: 0 }} />
        {loading ? (
          <View style={LogoStyles.logoContainer}>
            <LogoWithText style={LogoStyles.logo} />
          </View>
        ) : (
          <SafeAreaView style={LogoStyles.mainContainer}>
            {!currentUser.isLoggedIn ? <AuthNavigator /> : <NavigationPanel />}
            <LicenseBottomSheet />
          </SafeAreaView>
        )}
      </Fragment>
    </NavigationContainer>
  );
};
