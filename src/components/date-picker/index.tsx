import React, { useEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import { DatePickerOptions } from '@react-native-community/datetimepicker';
import { SvgIcon } from '../svg-icon';
import { Input } from 'react-native-elements';
import moment from 'moment';
import { DATE_FORMAT } from '../../constants/date-format';
import { styles } from './styles';
import { colors } from '../../main-styles';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Locale } from '../../constants/format-constants';

export const DatePicker: React.FC<DatePickerProps> = (props) => {
  const [date, setDate] = useState(props.currentValue ?? undefined);
  const [show, setShow] = useState(false);

  const onChange = (selectDate: Date) => {
    const currentDate = selectDate || date;
    setShow(false);
    setDate(currentDate);
    props.onChange && props.onChange(currentDate);
  };

  const showMode = () => {
    setShow(true);
  };

  useEffect(() => {
    props.currentValue && setDate(props.currentValue);
  }, [props.currentValue]);

  return (
    <View
      style={{
        ...styles.viewStyle,
        width: props.width ?? 'auto',
        height: props.height ?? 48,
        ...props.viewStyle
      }}
    >
      <Input
        value={date ? moment(date).format(DATE_FORMAT.toUpperCase()) : ''}
        label={props.label}
        labelStyle={{
          ...styles.labelStyle,
          width: props.labelWidth ?? 'auto',
        }}
        inputStyle={styles.inputStyle}
        inputContainerStyle={styles.inputContainerStyle}
        containerStyle={{
          ...styles.containerStyle,
          height: props.height ?? 48,
        }}
        rightIcon={
          <SvgIcon
            color={colors.middleGray}
            icon={'date-picker'}
            onPress={() => showMode()}
          />
        }
        rightIconContainerStyle={styles.rightIconContainerStyle}
        onPressIn={() => showMode()}
        showSoftInputOnFocus={false}
      />
      <DateTimePickerModal
        testID="dateTimePicker"
        isVisible={show}
        date={date}
        mode={props.mode ?? 'date'}
        confirmTextIOS={'Готово'}
        cancelTextIOS={'Отмена'}
        display={props.display ?? Platform.OS === 'ios' ? 'spinner' : 'default'}
        onConfirm={(value) => onChange(value)}
        locale={Locale.RU}
        onCancel={() => setShow(false)}
      />
    </View>
  );
};

interface DatePickerProps {
  currentValue?: Date;
  label: string;
  width?: number | string;
  height?: number | string;
  labelWidth?: number | string;
  mode?: 'date' | 'time' | 'datetime';
  display?: DatePickerOptions['display'];
  onChange?: (value: Date) => void;
  viewStyle?: any;
}
