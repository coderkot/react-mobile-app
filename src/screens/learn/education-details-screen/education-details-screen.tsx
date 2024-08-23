import React, { useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BusyIndicator } from '../../../components/common/busy-indicator/busy-indicator';
import { ListNodeItem } from '../../../components/common/list-node-item';
import { SearchTextBox } from '../../../components/education/search-text-box';
import { EducationStackParamList } from '../../../navigation/learn/types/education-stack-param-list';
import { getSubNodes } from '../../../store/actions/education/get-sub-nodes-by-id';
import { RootState } from '../../../store/reducers';
import { Node } from '../../../types/node/node';
import { styles } from './styles';
import { Crumbs } from '../../../components/crumbs';

export const EducationDetailsScreen = ({
  navigation,
  route,
}: StackScreenProps<EducationStackParamList, 'EducationDetails'>) => {
  const dispatch = useDispatch();
  const {
    educationScreenData: { rootNodes, isLoading },
  } = useSelector((state: RootState) => state.education);

  const [items, setItems] = useState(rootNodes);

  const crumbs = route.params.pathSegments.map((item) => ({
    path: '',
    name: item.name,
    id: item.id,
    onPress: () => {
      const pathSegments = [...route.params.pathSegments];
      pathSegments.pop();
      navigation.navigate('EducationDetails', {
        pathSegments: pathSegments,
      });
    },
  }));

  useEffect(() => {
    const pathSegment =
      route.params.pathSegments[route.params.pathSegments.length - 1];
    dispatch(getSubNodes(pathSegment.id));
  }, [dispatch, route]);

  useEffect(() => {
    setItems(rootNodes);
  }, [rootNodes]);

  const updateFilter = (filter: string): void => {
    const result = rootNodes.filter((p) =>
      p.name.toLowerCase().includes(filter.toLowerCase())
    );
    setItems(result);
  };

  const onItemPress = (item: Node) => {
    if (item.hasChildren) {
      navigation.navigate('EducationDetails', {
        pathSegments: [
          ...route.params.pathSegments,
          {
            id: item.id,
            parentId: item.parentId,
            name: item.name,
          },
        ],
      });
    }

    if (item.hasLeaves) {
      navigation.navigate('EducationFiles', {
        pathSegments: [
          ...route.params.pathSegments,
          {
            id: item.id,
            parentId: item.parentId,
            name: item.name,
          },
        ],
      });
    }
  };

  return (
    <BusyIndicator visible={isLoading}>
      <View
        style={{
          marginTop: 10,
        }}
      >
        <Crumbs crumbs={crumbs} />
        <SearchTextBox
          containerStyle={styles.searchBar}
          onChangeText={updateFilter}
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(p) => p.id}
          data={items}
          renderItem={({ item }: { item: Node }) => {
            return (
              <ListNodeItem item={item} onPress={() => onItemPress(item)} />
            );
          }}
        />
      </View>
    </BusyIndicator>
  );
};
