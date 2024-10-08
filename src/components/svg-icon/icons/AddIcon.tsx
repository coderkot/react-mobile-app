import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './IconProps';

export const AddIcon: React.FC<IconProps> = (props) => {
  return (
    <Svg
      width={props.width ?? 20}
      height={props.height ?? 20}
      viewBox="0 0 20 20"
      fill="none"
      onPress={props?.onPress}
    >
      <Path
        d="M10 4C10.5523 4 11 4.44772 11 5V9H15C15.5523 9 16 9.44771 16 10C16 10.5523 15.5523 11 15 11H11V15C11 15.5523 10.5523 16 10 16C9.44771 16 9 15.5523 9 15V11H5C4.44772 11 4 10.5523 4 10C4 9.44771 4.44772 9 5 9H9V5C9 4.44772 9.44771 4 10 4Z"
        fill={props.color}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 20C1.34315 20 0 18.6569 0 17V3C0 1.34315 1.34315 0 3 0H17C18.6569 0 20 1.34315 20 3V17C20 18.6569 18.6569 20 17 20H3ZM2 17C2 17.5523 2.44772 18 3 18H17C17.5523 18 18 17.5523 18 17V3C18 2.44772 17.5523 2 17 2H3C2.44772 2 2 2.44772 2 3V17Z"
        fill={props.color}
      />
    </Svg>
  );
};
