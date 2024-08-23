import React from 'react';
import { Text, View, ViewStyle } from 'react-native';
import { SvgIcon } from '../svg-icon';
import { styles } from './styles';
import { colors } from '../../main-styles';
import { TouchableOpacity } from 'react-native';

export const ProfileCvSection: React.FC<ProfileCvSectionProps> = (props) => {
  const defaultValues = {
    showCloseIcon: props.showCloseIcon ?? true,
    showAddIcon: props.showAddIcon ?? true,
  };

  return (
    <View style={props.style}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{props.title}</Text>
        {defaultValues.showAddIcon && (
          <TouchableOpacity onPress={props.addHandler}>
            <SvgIcon
              icon={'add'}
              color={colors.blue}
              width={24}
              height={24}
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.section}>
        <View style={{ width: '100%' }}>{props.children}</View>
      </View>
    </View>
  );
};

interface ProfileCvSectionProps {
  title: string;
  style?: ViewStyle;
  showCloseIcon?: boolean;
  showAddIcon?: boolean;
  addHandler?: () => void;
}
