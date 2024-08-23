import React from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';
import Favorite from '../../../assets/icons/svg/favorite.svg';
import InFavorite from '../../../assets/icons/svg/in-favorite.svg';

export const StarIcon: React.FC<StarIconProps> = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      {props.isActive ? <InFavorite /> : <Favorite />}
    </TouchableOpacity>
  );
};

interface StarIconProps {
  isActive?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}
