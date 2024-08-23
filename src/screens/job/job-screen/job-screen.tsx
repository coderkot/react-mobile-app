import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList, View } from 'react-native';
import { ListNodeItem } from '../../../components/common/list-node-item';
import { TreeNodeModel } from '../../../server/models/models';
import { TreeNodeNames } from '../../../constants/type-constants';
import { JobStyles } from '../styles';
import { SearchTextBox } from '../../../components/education/search-text-box';
import { useDebounce } from '../../../hooks/useDebounce';
import { isEmpty } from '../../../utils/utils';
import { useTreeNodes } from '../../../hooks/useTreeNodes';
import { NoData } from '../../../components/no-data';

export const JobScreen = () => {
  const navigation = useNavigation<any>();
  const [tree, setTree] = useState<Array<TreeNodeModel>>([]);
  const [loadingError, setLoadingError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState('');
  const debounceSearch = useDebounce(search, 500);
  const [visibleSearch, setVisibleSearch] = useState(false);
  const sortingOrder = [
    'Нормативная документация',
    'Справочная информация',
    'Образцы документов',
  ];

  const { getTreeNodes } = useTreeNodes(
    TreeNodeNames.DOCUMENTATION,
    setTree,
    sortingOrder,
    setLoadingError,
    setLoading,
    setVisibleSearch
  );

  useEffect(() => {
    getTreeNodes();
  }, []);

  const handleSearch = (text: string) => {
    setSearch(text);
  };

  useEffect(() => {
    if (!isEmpty(debounceSearch)) {
      const result = tree.filter((item) =>
        item.name.toLowerCase().includes(debounceSearch.toLowerCase())
      );
      setTree(result);
    }
  }, [debounceSearch]);

  return (
    <View
      style={{
        marginTop: 10,
      }}
    >
      {visibleSearch && (
        <SearchTextBox
          placeholder="Поиск по названию"
          containerStyle={JobStyles.searchBar}
          onChangeText={handleSearch}
          onClear={getTreeNodes}
          value={search}
        />
      )}
      {tree?.length > 0 && (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 16 }}
          keyExtractor={(item) => item?.id}
          data={tree}
          renderItem={({ item }) => {
            return (
              <ListNodeItem
                item={item}
                onPress={() => {
                  navigation.push('SubItem', {
                    id: item.id,
                    title: item.name,
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
