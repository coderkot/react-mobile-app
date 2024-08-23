import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './IconProps';
import { colors } from '../../../main-styles';

export const BellIcon: React.FC<IconProps> = (props) => {
  return (
    <Svg
      width={props.width ?? 16}
      height={props.height ?? 18}
      viewBox="0 0 16 18"
      fill="none"
      onPress={() => {
        // @ts-ignore
        props.onPress ? props.onPress() : null;
      }}
    >
      <Path
        d="M15.2537 12.8693C14.4715 12.087 13.5 11.1135 13.5 7.3125C13.5 4.5213 11.4669 2.20539 8.80091 1.76379C8.93083 1.57613 9.0003 1.35325 9 1.125C9 0.503684 8.49631 0 7.875 0C7.25368 0 6.75 0.503684 6.75 1.125C6.75 1.3623 6.82365 1.58231 6.94909 1.76379C4.28312 2.20539 2.25 4.5213 2.25 7.3125C2.25 11.1135 1.27817 12.087 0.495945 12.8693C-0.563981 13.9292 0.187203 15.75 1.68918 15.75H5.625C5.625 16.9926 6.63236 18 7.875 18C9.11763 18 10.125 16.9926 10.125 15.75H14.0605C15.5595 15.75 16.3158 13.9313 15.2537 12.8693Z"
        fill={props.color}
      />
    </Svg>
  );
};
