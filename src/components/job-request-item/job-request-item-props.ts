import { GestureResponderEvent, ViewStyle } from 'react-native';
import { JobRequestsModel } from '../../server/models/models';

export interface JobRequestsItemProps {
  job: JobRequestsModel;
  onPress?: (event: GestureResponderEvent) => void;
  showDescription?: boolean;
  style?: ViewStyle;
}
