import React, { useState } from 'react';
import { Platform } from 'react-native';
import { colors } from '../../main-styles';
import RNPickerSelect, { Item } from 'react-native-picker-select';
import { Picker } from '@react-native-picker/picker';
import { Icon } from 'react-native-elements';

export const SelectBox: React.FC<SelectBoxProps> = (props) => {
  const [boxValue, setBoxValue] = useState();
  const [down, setDown] = useState<boolean>(true);

  return (
    <>
      {Platform.OS === 'ios' ? (
        <RNPickerSelect
          key={props.key}
          itemKey={props.value}
          //данный фикс сделан специально, потому как в жтой либе есть бага, и onValueChange вызывается несколько раз
          value={boxValue ? undefined : props.value}
          onValueChange={(value) => {
            setBoxValue(value);
          }}
          Icon={() => {
            return (
              <Icon
                type={'material'}
                name={down ? 'arrow-drop-down' : 'arrow-drop-up'}
                color={
                  props.dropdownIconColor
                    ? props.dropdownIconColor
                    : colors.gray
                }
              />
            );
          }}
          style={{
            viewContainer: props.styles,
            modalViewBottom: { backgroundColor: colors.whiteGray },
          }}
          items={props.list}
          doneText={'Готово'}
          textInputProps={{
            style: {
              color: props.dropdownIconColor
                ? props.dropdownIconColor
                : colors.black,
              padding: 5,
            },
          }}
          placeholder={
            props.placeholder
              ? props.placeholder
              : {
                  label: 'Выберите элемент',
                  value: null,
                  inputLabel: 'Выберите элемент',
                }
          }
          onOpen={() => setDown(false)}
          onClose={() => {
            setDown(true);
            props.change(boxValue);
          }}
        />
      ) : (
        <Picker
          selectedValue={props.value}
          key={props.key}
          onValueChange={(value) => props.change(value)}
          style={props.styles}
          dropdownIconColor={props.dropdownIconColor}
        >
          {props.placeholder && (
            <Picker.Item
              key={props.placeholder.value}
              label={props.placeholder.label}
              value={props.placeholder.value}
            />
          )}
          {props.list.map((dict) => (
            <Picker.Item key={dict.key} label={dict.label} value={dict.value} />
          ))}
        </Picker>
      )}
    </>
  );
};

interface SelectBoxProps {
  list: Array<Item>;
  change: (value: any) => void;
  value: any;
  placeholder?: Item | Object;
  dropdownIconColor?: any;
  styles?: any;
  key?: any;
}
