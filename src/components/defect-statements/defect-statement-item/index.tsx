import * as React from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import { ChevronIcon } from '../../education/chevron-icon';
import { styles } from './styles';
import { DefectStatement } from '../../../types/defect-statement';

export const DefectStatementItem: React.FC<DefectStatementItemProps> = (
  props
) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <ListItem bottomDivider containerStyle={styles.containerStyle}>
        <ListItem.Content style={styles.contentWrapper}>
          <ListItem.Title style={styles.title}>
            {props.item.name}
          </ListItem.Title>
          <ListItem.Title style={styles.date}>
            {props.item.createdAt}
          </ListItem.Title>
        </ListItem.Content>
        <ChevronIcon />
      </ListItem>
    </TouchableOpacity>
  );
};

interface DefectStatementItemProps {
  item: DefectStatement;
  onPress?: (event: GestureResponderEvent) => void;
}
