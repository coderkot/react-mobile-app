import { ActionsService } from '../redux/actions';
import { useDispatch } from 'react-redux';

// TODO: подумать в будущем над другой реализацией
export function useNotificationModal(isOpen: boolean, modalRef: any) {
  const dispatch = useDispatch();

  if (isOpen) {
    modalRef.current.open();
    dispatch({ type: ActionsService.OPEN_NOTIFICATION_LIST, payload: false });
  }
}
