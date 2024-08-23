import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './IconProps';

export const LearnIcon: React.FC<IconProps> = (props) => {
  return (
    <Svg
      width={props.width ?? 22}
      height={props.height ?? 17}
      viewBox="0 0 22 17"
      fill="none"
      onPress={() => {
        // @ts-ignore
        props.onPress ? props.onPress() : null;
      }}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 2H8C9.10457 2 10 2.89543 10 4V13C10 13.5523 9.55229 14 9 14H3C2.44772 14 2 13.5523 2 13V3C2 2.44772 2.44772 2 3 2ZM13 16C12.6494 16 12.3128 15.9398 12 15.8293V16C12 16.5523 11.5523 17 11 17C10.4477 17 10 16.5523 10 16V15.8293C9.68722 15.9398 9.35064 16 9 16H3C1.34315 16 0 14.6569 0 13V3C0 1.34315 1.34315 0 3 0H8C9.19469 0 10.2671 0.523755 11 1.35418C11.7329 0.523755 12.8053 0 14 0H19C20.6569 0 22 1.34315 22 3V13C22 14.6569 20.6569 16 19 16H13ZM12 4V13C12 13.5523 12.4477 14 13 14H19C19.5523 14 20 13.5523 20 13V3C20 2.44772 19.5523 2 19 2H14C12.8954 2 12 2.89543 12 4ZM4 4H8V6H4V4ZM14 4H18V6H14V4ZM18 7H14V9H18V7ZM4 7H8V9H4V7ZM18 10H14V12H18V10ZM4 10H8V12H4V10Z"
        fill={props.color}
      />
    </Svg>
  );
};
