import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { ListNodeItem } from '../../../components/common/list-node-item';
import { TreeNodeModel } from '../../../server/models/models';
import { getRootNodes } from '../../../redux/thunks';
import { TreeNodeNames } from '../../../constants/type-constants';
import { NoData } from '../../../components/no-data';

export const EducationScreen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const [tree, setTree] = useState<Array<TreeNodeModel>>([]);
  const [loadingError, setLoadingError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const sortingOrder = [
    'Методические материалы',
    'Видеоматериалы',
    'Вопросы для самоподготовки',
  ];

  useEffect(() => {
    dispatch(
      getRootNodes(
        TreeNodeNames.LEARNING,
        setTree,
        sortingOrder,
        setLoadingError,
        setLoading
      )
    );
  }, []);

  return (
    <View
      style={{
        marginTop: 26,
      }}
    >
      {tree?.length > 0 && (
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          data={tree}
          renderItem={({ item }) => {
            return (
              <ListNodeItem
                item={item}
                onPress={() => {
                  navigation.push('SubItem', {
                    id: item.id,
                    title: item.name,
                    routeType: TreeNodeNames.LEARNING,
                    showCrumbs: true,
                  });
                }}
              />
            );
          }}
        />
      )}

      <NoData loading={loading} data={tree} errorMessage={loadingError} />
    </View>
  );
};
