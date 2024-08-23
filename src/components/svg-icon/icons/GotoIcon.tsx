import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './IconProps';

export const GotoIcon: React.FC<IconProps> = (props) => {
  return (
    <Svg
      width={props.width ?? 8}
      height={props.height ?? 13}
      viewBox="0 0 8 13"
      fill="none"
      onPress={() => {
        // @ts-ignore
        props.onPress ? props.onPress() : null;
      }}
    >
      <Path
        d="M0.497056 1.51222L0.497057 11.4936C0.497057 12.3911 1.58327 12.8399 2.21655 12.2066L7.20726 7.21589C7.60149 6.82166 7.60149 6.18419 7.20726 5.79416L2.21655 0.799256C1.58327 0.16598 0.497056 0.614725 0.497056 1.51222Z"
        fill={props.color}
      />
    </Svg>
  );
};
