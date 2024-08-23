import React from 'react';
import { RequestsIcon } from './icons/RequestsIcon';
import { NewsIcon } from './icons/NewsIcon';
import { LearnIcon } from './icons/LearnIcon';
import { JobIcon } from './icons/JobIcon';
import { ProfileIcon } from './icons/ProfileIcon';
import { GotoIcon } from './icons/GotoIcon';
import { AddIcon } from './icons/AddIcon';
import { CloseIcon } from './icons/CloseIcon';
import { IconProps } from './icons/IconProps';
import { DatePickerIcon } from './icons/DatePickerIcon';
import { BellIcon } from './icons/BellIcon';
import { UnreadBellIcon } from './icons/UnreadBellIcon';

export const SvgIcon: React.FC<SvgIconsProps> = (props) => {
  const container = new Map();
  container.set(
    'requests',
    <RequestsIcon
      color={props.color}
      width={props.width}
      height={props.height}
      onPress={props.onPress}
    />
  );
  container.set(
    'news',
    <NewsIcon
      color={props.color}
      width={props.width}
      height={props.height}
      onPress={props.onPress}
    />
  );
  container.set(
    'learn',
    <LearnIcon
      color={props.color}
      width={props.width}
      height={props.height}
      onPress={props.onPress}
    />
  );
  container.set(
    'job',
    <JobIcon
      color={props.color}
      width={props.width}
      height={props.height}
      onPress={props.onPress}
    />
  );
  container.set(
    'profile',
    <ProfileIcon
      color={props.color}
      width={props.width}
      height={props.height}
      onPress={props.onPress}
    />
  );
  container.set(
    'goto',
    <GotoIcon
      color={props.color}
      width={props.width}
      height={props.height}
      onPress={props.onPress}
    />
  );
  container.set(
    'add',
    <AddIcon
      color={props.color}
      width={props.width}
      height={props.height}
      onPress={props.onPress}
    />
  );
  container.set(
    'close',
    <CloseIcon
      color={props.color}
      width={props.width}
      height={props.height}
      onPress={props.onPress}
    />
  );
  container.set(
    'date-picker',
    <DatePickerIcon
      color={props.color}
      width={props.width}
      height={props.height}
      onPress={props.onPress}
    />
  );
  container.set(
    'bell',
    <BellIcon
      color={props.color}
      width={props.width}
      height={props.height}
      onPress={props.onPress}
    />
  );
  container.set(
    'unread-bell',
    <UnreadBellIcon
      color={props.color}
      width={props.width}
      height={props.height}
      onPress={props.onPress}
    />
  );

  return container.get(props.icon);
};

type SvgIconsProps = IconProps & {
  icon:
    | 'requests'
    | 'news'
    | 'learn'
    | 'job'
    | 'profile'
    | 'goto'
    | 'add'
    | 'close'
    | 'date-picker'
    | 'bell'
    | 'unread-bell';
};
