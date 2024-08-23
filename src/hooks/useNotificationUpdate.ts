import { useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { getNotifications } from '../redux/thunks';
import { TIME_UPDATE_NOTIFICATION } from '../constants/setting-constants';
import NetInfo from '@react-native-community/netinfo';
import { ActionsService } from '../redux/actions';

export function useNotificationUpdate() {
  const dispatch = useDispatch();
  const appState = useRef(AppState.currentState);
  const intervalID = useRef<any>(null);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const updateList = () => {
    dispatch(getNotifications());
  };

  const netCheck = () => {
    NetInfo.fetch().then((state) => {
      if (state.isInternetReachable !== null) {
        dispatch({
          type: ActionsService.OFFLINE_MODE,
          payload: !state.isInternetReachable,
        });
      }
    });
  };

  useEffect(() => {
    const stateHandler = (nextAppState: AppStateStatus) => {
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    };

    AppState.addEventListener('change', stateHandler);

    return () => {
      AppState.removeEventListener('change', stateHandler);
    };
  }, []);

  useEffect(() => {
    if (appStateVisible === 'active') {
      netCheck();
      updateList();

      intervalID.current = setInterval(() => {
        updateList();
      }, TIME_UPDATE_NOTIFICATION);
    } else {
      clearInterval(intervalID?.current);
    }
  }, [appStateVisible]);
}
