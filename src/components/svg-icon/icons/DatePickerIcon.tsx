import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './IconProps';
import { colors } from '../../../main-styles';

export const DatePickerIcon: React.FC<IconProps> = (props) => {
  return (
    <Svg
      width={props.width ?? 14}
      height={props.height ?? 16}
      viewBox="0 0 14 16"
      fill="none"
      onPress={() => {
        // @ts-ignore
        props.onPress ? props.onPress() : null;
      }}
    >
      <Path
        d="M0.375 6H13.625C13.8313 6 14 6.16875 14 6.375V14.5C14 15.3281 13.3281 16 12.5 16H1.5C0.671875 16 0 15.3281 0 14.5V6.375C0 6.16875 0.16875 6 0.375 6ZM14 4.625V3.5C14 2.67188 13.3281 2 12.5 2H11V0.375C11 0.16875 10.8313 0 10.625 0H9.375C9.16875 0 9 0.16875 9 0.375V2H5V0.375C5 0.16875 4.83125 0 4.625 0H3.375C3.16875 0 3 0.16875 3 0.375V2H1.5C0.671875 2 0 2.67188 0 3.5V4.625C0 4.83125 0.16875 5 0.375 5H13.625C13.8313 5 14 4.83125 14 4.625Z"
        fill={props.color}
      />
    </Svg>
  );
};
