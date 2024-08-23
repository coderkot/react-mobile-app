import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './IconProps';

export const JobIcon: React.FC<IconProps> = (props) => {
  return (
    <Svg
      width={props.width ?? 18}
      height={props.height ?? 17}
      viewBox="0 0 18 17"
      fill="none"
      onPress={() => {
        // @ts-ignore
        props.onPress ? props.onPress() : null;
      }}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 3C14 1.34315 12.6569 0 11 0H7C5.34315 0 4 1.34315 4 3H3C1.34315 3 0 4.34315 0 6V14C0 15.6569 1.34315 17 3 17H15C16.6569 17 18 15.6569 18 14V6C18 4.34315 16.6569 3 15 3H14ZM11 2H7C6.44772 2 6 2.44772 6 3H12C12 2.44772 11.5523 2 11 2ZM3 5H15C15.5523 5 16 5.44772 16 6V14C16 14.5523 15.5523 15 15 15H3C2.44772 15 2 14.5523 2 14V6C2 5.44772 2.44772 5 3 5Z"
        fill={props.color}
      />
    </Svg>
  );
};
