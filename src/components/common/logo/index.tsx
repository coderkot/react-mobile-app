import React from 'react';
import LogoSvg from '../../../assets/images/logo.svg';
import LogoWithText from '../../../assets/images/logo-with-text.svg';

export const Logo: React.FC<LogoProps> = (props) => {
  return props.showTitle ? <LogoWithText /> : <LogoSvg />;
};

interface LogoProps {
  showTitle?: boolean;
}
