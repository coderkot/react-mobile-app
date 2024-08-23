import * as React from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import { ChevronIcon } from '../../education/chevron-icon';
import { styles } from './styles';
import DocumentationIcon from '../../../assets/icons/svg/documentation.svg';

export const ListNodeItem: React.FC<ListNodeItemProps> = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <ListItem bottomDivider containerStyle={styles.containerStyle}>
        <DocumentationIcon />
        <ListItem.Content>
          <ListItem.Title style={styles.title}>
            {props.item.name}
          </ListItem.Title>
        </ListItem.Content>
        <ChevronIcon />
      </ListItem>
    </TouchableOpacity>
  );
};

interface ListNodeItemProps {
  item: { name: string };
  onPress?: (event: GestureResponderEvent) => void;
}
