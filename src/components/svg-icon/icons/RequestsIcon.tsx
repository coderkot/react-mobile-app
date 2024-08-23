import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './IconProps';

export const RequestsIcon: React.FC<IconProps> = (props) => {
  return (
    <Svg
      width={props.width ?? 20}
      height={props.height ?? 18}
      viewBox="0 0 20 18"
      fill="none"
      onPress={() => {
        // @ts-ignore
        props.onPress ? props.onPress() : null;
      }}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 8C8.20914 8 10 6.20914 10 4C10 1.79086 8.20914 0 6 0C3.79086 0 2 1.79086 2 4C2 6.20914 3.79086 8 6 8Z"
        fill={props.color}
      />
      <Path
        d="M12 18V12C12 10.3431 10.6569 9 9 9H3C1.34315 9 0 10.3431 0 12V18C4.66189 18 5.41834 18 12 18Z"
        fill={props.color}
      />
      <Path d="M20 8H14V10H20V8Z" fill={props.color} />
      <Path d="M14 12H20V14H14V12Z" fill={props.color} />
      <Path d="M20 4H14V6H20V4Z" fill={props.color} />
    </Svg>
  );
};
