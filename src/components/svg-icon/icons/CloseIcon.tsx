import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../../main-styles';
import { IconProps } from './IconProps';

export const CloseIcon: React.FC<IconProps> = (props) => {
  return (
    <Svg
      width={props.width ?? 14}
      height={props.height ?? 14}
      viewBox="0 0 14 14"
      fill="none"
      onPress={() => {
        // @ts-ignore
        props.onPress ? props.onPress() : null;
      }}
    >
      <Path
        d="M1.59717 0.274032C1.2318 -0.0913438 0.639407 -0.0913438 0.274032 0.274032C-0.0913438 0.639407 -0.0913438 1.2318 0.274032 1.59717L5.67689 7.00003L0.274087 12.4028C-0.0912877 12.7682 -0.0912881 13.3606 0.274087 13.726C0.639463 14.0913 1.23185 14.0913 1.59723 13.726L7.00003 8.32317L12.4028 13.726C12.7682 14.0913 13.3606 14.0913 13.726 13.726C14.0913 13.3606 14.0913 12.7682 13.726 12.4028L8.32317 7.00003L13.726 1.59717C14.0914 1.2318 14.0914 0.639407 13.726 0.274032C13.3607 -0.0913438 12.7683 -0.0913438 12.4029 0.274032L7.00003 5.67689L1.59717 0.274032Z"
        fill={props.color}
      />
    </Svg>
  );
};
