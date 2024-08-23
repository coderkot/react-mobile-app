import * as React from 'react';
import {
  GestureResponderEvent,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { Tab } from 'react-native-elements';
import { Plus } from '../../common/plus';
import { DefectTabStyles } from './styles';
import { Defect } from '../../../types/defect';
import CloseIcon from '../../../assets/icons/svg/close-icon.svg';

export const DefectHeaderTabs: React.FC<DefectHeaderTabsProps> = (props) => {
  return (
    <ScrollView
      style={{
        width: '100%',
      }}
      horizontal={true}
      showsHorizontalScrollIndicator={true}
    >
      <Tab
        value={props.value}
        onChange={props.onChange}
        indicatorStyle={{
          backgroundColor: '#F5F5F5',
        }}
        disableIndicator={true}
      >
        {props.defects.map((defect, index) => {
          const containerStyle =
            index === props.value
              ? DefectTabStyles.tabItemContainerActive
              : DefectTabStyles.tabItemContainerNotActive;

          return (
            <Tab.Item
              iconRight={true}
              icon={
                index !== 0 && (
                  <TouchableOpacity onPress={() => props.closeHandler(index)}>
                    <CloseIcon />
                  </TouchableOpacity>
                )
              }
              iconPosition={'right'}
              key={index + 'CustomTab'}
              title={`Дефект ${index + 1}`}
              titleStyle={DefectTabStyles.tabItemTitle}
              containerStyle={containerStyle}
            />
          );
        })}
        <View
          style={{
            zIndex: 10,
            justifyContent: 'center',
            marginLeft: 10,
          }}
        >
          <Plus onPress={props.onPress} />
        </View>
      </Tab>
    </ScrollView>
  );
};

interface DefectHeaderTabsProps {
  onChange: (value: string | null) => void;
  onPress?: (event: GestureResponderEvent) => void;
  value?: any;
  defects: Defect[];
  closeHandler: (index: number) => void;
}
