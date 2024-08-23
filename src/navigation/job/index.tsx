import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DefectStatementListsScreen } from '../../screens/job/defect-statement-lists-screen/defect-statement-lists-screen';
import { DefectStatementScreen } from '../../screens/job/defect-statement-screen/defect-statement-screen';
import { JobMenuItems } from '../../screens/job/job-menu-items';
import { JobScreen } from '../../screens/job/job-screen/job-screen';
import { ManufacturersProposalsDetailsScreen } from '../../screens/job/manufacturers-proposals-details-screen/manufacturers-proposals-details-screen';
import { ManufacturersProposalsScreen } from '../../screens/job/manufacturers-proposals-screen/manufacturers-proposals-screen';
import { JobStackParamList } from './types/job-stack-param-list';
import { MainStyles } from '../../main-styles';
import { PersonalAttestation } from '../../screens/job/personal-attestation';
import { LaboratoryAttestation } from '../../screens/job/laboratory-attestation';
import { HeaderRight } from '../../components/common/header-right';
import { View } from 'react-native';
import { SubItem } from '../../components/SubItem';

const JobStack = createStackNavigator<JobStackParamList>();

export const JobNavigator = () => {
  const options: any = {
    headerStyle: MainStyles.headerStyles,
    headerTitleAlign: 'center',
    headerBackTitle: '',
    headerBackTitleVisible: false,
  };

  const manufacturersProposalsTitle = 'Предложения производителей';

  return (
    <View style={{ width: '100%', height: '100%' }}>
      <JobStack.Navigator>
        <JobStack.Screen
          name="JobMenu"
          component={JobMenuItems}
          options={() => ({
            headerRight: () => <HeaderRight />,
            ...options,
            title: 'Работа',
          })}
        />
        <JobStack.Screen
          name="Job"
          component={JobScreen}
          options={() => ({
            headerRight: () => <HeaderRight />,
            ...options,
            title: 'Документация',
          })}
        />

        <JobStack.Screen
          name={'LaboratoryAttestation'}
          component={LaboratoryAttestation}
          options={() => ({
            headerRight: () => <HeaderRight />,
            ...options,
            title: 'Аттестация лаборатории',
          })}
        />
        <JobStack.Screen
          name="PersonalAttestation"
          component={PersonalAttestation}
          options={() => ({
            headerRight: () => <HeaderRight />,
            ...options,
            title: 'Аттестация персонала',
          })}
        />
        <JobStack.Screen
          name={'SubItem'}
          component={SubItem}
          options={() => ({
            headerRight: () => <HeaderRight />,
            ...options,
          })}
        />

        <JobStack.Screen
          name="ManufacturersProposals"
          component={ManufacturersProposalsScreen}
          options={() => ({
            headerRight: () => <HeaderRight />,
            ...options,
            title: manufacturersProposalsTitle,
          })}
        />
        <JobStack.Screen
          name="ManufacturersProposalsDetail"
          component={ManufacturersProposalsDetailsScreen}
          options={() => ({
            headerRight: () => <HeaderRight />,
            ...options,
            title: manufacturersProposalsTitle,
          })}
        />
        <JobStack.Screen
          name="DefectStatementLists"
          component={DefectStatementListsScreen}
          options={() => ({
            headerRight: () => <HeaderRight />,
            ...options,
            title: 'Ведомости дефектов',
          })}
        />
        <JobStack.Screen
          name="DefectStatement"
          component={DefectStatementScreen}
          options={() => ({
            headerRight: () => <HeaderRight />,
            ...options,
            title: 'Создание ведомости',
          })}
        />
      </JobStack.Navigator>
    </View>
  );
};
