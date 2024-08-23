import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './IconProps';

export const NewsIcon: React.FC<IconProps> = (props) => {
  return (
    <Svg
      width={props.width ?? 18}
      height={props.height ?? 18}
      viewBox="0 0 18 18"
      fill="none"
      onPress={() => {
        // @ts-ignore
        props.onPress ? props.onPress() : null;
      }}
    >
      <Path
        d="M5.016 3.982a1.003 1.003 0 000 2.006h7.95a1.003 1.003 0 000-2.006h-7.95zM4.016 9c0-.552.447-1.003 1-1.003h7.95a1.003 1.003 0 010 2.006h-7.95c-.553 0-1-.45-1-1.003zM5.025 12.012a1.003 1.003 0 000 2.007h7.95a1.003 1.003 0 000-2.007h-7.95z"
        fill={props.color}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 3a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H3a3 3 0 01-3-3V3zm3-1h12a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1z"
        fill={props.color}
      />
    </Svg>
  );
};
