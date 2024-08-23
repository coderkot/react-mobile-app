import React from 'react';
import Svg, { Path, Rect } from "react-native-svg";
import { IconProps } from './IconProps';

export const UnreadBellIcon: React.FC<IconProps> = (props) => {
  return (
    <Svg
      viewBox="0 0 24 24"
      fill="none"
      width={props.width ?? 24}
      height={props.height ?? 24}
      onPress={() => {
        // @ts-ignore
        props.onPress ? props.onPress() : null;
      }}
    >
      <Path
        d="M19.2537 15.8693C18.4715 15.087 17.5 14.1135 17.5 10.3125C17.5 7.5213 15.4669 5.20539 12.8009 4.76379C12.9308 4.57613 13.0003 4.35325 13 4.125C13 3.50368 12.4963 3 11.875 3C11.2537 3 10.75 3.50368 10.75 4.125C10.75 4.3623 10.8236 4.58231 10.9491 4.76379C8.28312 5.20539 6.25 7.5213 6.25 10.3125C6.25 14.1135 5.27817 15.087 4.49595 15.8693C3.43602 16.9292 4.1872 18.75 5.68918 18.75H9.625C9.625 19.9926 10.6324 21 11.875 21C13.1176 21 14.125 19.9926 14.125 18.75H18.0605C19.5595 18.75 20.3158 16.9313 19.2537 15.8693Z"
        fill={props.color}
      />
      <Rect x="14" y="2" width="8" height="8" rx="4" fill="#FF002C" />
    </Svg>
  );
};
