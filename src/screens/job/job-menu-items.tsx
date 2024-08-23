import React, { ReactNode } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { JobStyles } from './styles';
import { useNavigation } from '@react-navigation/native';
import DocIcon from '../../assets/icons/svg/job/docs.svg';
import AdIcon from '../../assets/icons/svg/job/ad.svg';
import DefectIcon from '../../assets/icons/svg/job/defect.svg';
import AttestationIcon from '../../assets/icons/svg/job/attestation.svg';
import PersonalAttestationIcon from '../../assets/icons/svg/job/personal-attestation.svg';

export const JobMenuItems = () => {
  const navigation = useNavigation<any>();
  const elements: {
    name: string;
    icon: ReactNode;
    id: string;
    onPress: () => void;
  }[] = [
    {
      name: 'Документация',
      id: '11',
      icon: <DocIcon />,
      onPress: () => {
        navigation.push('Job', {
          menuTitle: 'Документация',
        });
      },
    },
    {
      name: 'Предложения производителей',
      id: '22',
      icon: <AdIcon />,
      onPress: () => {
        navigation.navigate('ManufacturersProposals');
      },
    },
    {
      name: 'Ведомости дефектов',
      id: '33',
      icon: <DefectIcon />,
      onPress: () => {
        navigation.navigate('DefectStatementLists');
      },
    },
    {
      name: 'Аттестация лаборатории',
      id: '44',
      icon: <AttestationIcon />,
      onPress: () => {
        navigation.navigate('LaboratoryAttestation');
      },
    },
    {
      name: 'Аттестация персонала',
      id: '55',
      icon: <PersonalAttestationIcon />,
      onPress: () => {
        navigation.navigate('PersonalAttestation', {
          menuTitle: 'Аттестация персонала',
        });
      },
    },
  ];

  return (
    <View
      style={{
        marginTop: 24,
      }}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(p) => p.id}
        data={elements}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={item.onPress}>
              <ListItem bottomDivider containerStyle={JobStyles.menuItems}>
                <ListItem.Content style={JobStyles.content}>
                  {item.icon}
                  <ListItem.Title style={{ marginLeft: 8 }}>
                    {item.name}
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
