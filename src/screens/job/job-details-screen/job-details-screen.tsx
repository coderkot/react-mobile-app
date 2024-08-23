import React, { useEffect, useLayoutEffect, useState } from 'react';
import { HeaderBackButton } from '@react-navigation/stack';
import { FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BusyIndicator } from '../../../components/common/busy-indicator/busy-indicator';
import { ListNodeItem } from '../../../components/common/list-node-item';
import { PathSegments } from '../../../components/education/path-segments';
import { SearchTextBox } from '../../../components/education/search-text-box';
import { getSubNodesById } from '../../../store/actions/job/get-sub-nodes-by-id';
import { RootState } from '../../../store/reducers';
import { Node } from '../../../types/node/node';
import { styles } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';

export const JobDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const dispatch = useDispatch();
  const {
    jobScreenData: { nodes, isLoading },
  } = useSelector((state: RootState) => state.job);

  const [items, setItems] = useState(nodes);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.title,
      headerLeft: (props) => (
        <HeaderBackButton
          {...props}
          onPress={() => {
            const pathSegments = [...route.params.pathSegments];
            pathSegments.pop();
            if (pathSegments.length === 0) {
              navigation.navigate('Job', {
                menuTitle: route.params.menuTitle,
              });
            } else {
              navigation.navigate('JobDetails', {
                pathSegments: pathSegments,
                title: route.params.title,
                menuTitle: route.params.menuTitle,
              });
            }
          }}
        />
      ),
    });
  }, [navigation, route]);

  useEffect(() => {
    const pathSegment =
      route.params.pathSegments[route.params.pathSegments.length - 1];
    dispatch(getSubNodesById(pathSegment.id));
  }, [route]);

  useEffect(() => {
    setItems(nodes);
  }, [nodes]);

  const updateFilter = (filter: string): void => {
    const result = nodes.filter((p) =>
      p.name.toLowerCase().includes(filter.toLowerCase())
    );
    setItems(result);
  };

  const onItemPress = (item: Node) => {
    if (item.hasChildren) {
      navigation.navigate('JobDetails', {
        pathSegments: [
          ...route.params.pathSegments,
          {
            id: item.id,
            parentId: item.parentId,
            name: item.name,
          },
        ],
        title: route.params.title,
        menuTitle: route.params.menuTitle,
      });
    }
    if (item.hasLeaves) {
      navigation.navigate('JobFiles', {
        pathSegments: [
          ...route.params.pathSegments,
          {
            id: item.id,
            parentId: item.parentId,
            name: item.name,
          },
        ],
        title: route.params.title,
        menuTitle: route.params.menuTitle,
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
        <PathSegments
          pathSegments={route.params.pathSegments.map((p) => p.name)}
        />
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
