import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { LaboratoryStyles } from './styles';
import { SvgIcon } from '../../../components/svg-icon';
import { colors } from '../../../main-styles';
import { useNavigation } from '@react-navigation/native';
import { TreeNodeNames } from '../../../constants/type-constants';
import { TreeNodeModel } from '../../../server/models/models';
import { SearchTextBox } from '../../../components/education/search-text-box';
import DocumentationIcon from '../../../assets/icons/svg/documentation.svg';
import { isEmpty } from '../../../utils/utils';
import { useDebounce } from '../../../hooks/useDebounce';
import { useTreeNodes } from '../../../hooks/useTreeNodes';
import { NoData } from '../../../components/no-data';

export const LaboratoryAttestation = () => {
  const navigation = useNavigation<any>();
  const [tree, setTree] = useState<Array<TreeNodeModel>>([]);
  const [search, setSearch] = useState('');
  const debounceSearch = useDebounce(search, 500);
  const [loadingError, setLoadingError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [visibleSearch, setVisibleSearch] = useState(false);

  const { getTreeNodes } = useTreeNodes(
    TreeNodeNames.LABORATORY_ATTESTATION,
    setTree,
    undefined,
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
    <View style={{ marginTop: 10, flexDirection: 'column', flex: 1 }}>
      {visibleSearch && (
        <SearchTextBox
          placeholder="Поиск по названию"
          containerStyle={LaboratoryStyles.searchBar}
          onChangeText={handleSearch}
          onClear={getTreeNodes}
          value={search}
        />
      )}
      {tree?.length > 0 && (
        <FlatList
          data={tree}
          keyExtractor={(item) => item.id}
          style={{ marginTop: 16 }}
          contentContainerStyle={{
            paddingBottom: 80,
          }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.push('SubItem', {
                  id: item.id,
                  title: item.name,
                  nodeType: TreeNodeNames.LABORATORY_ATTESTATION,
                })
              }
            >
              <ListItem
                bottomDivider
                containerStyle={LaboratoryStyles.menuItems}
              >
                <DocumentationIcon />
                <ListItem.Content>
                  <ListItem.Title>{item.name}</ListItem.Title>
                </ListItem.Content>
                <SvgIcon icon={'goto'} color={colors.middleGray} />
              </ListItem>
            </TouchableOpacity>
          )}
        />
      )}
      <NoData loading={loading} data={tree} errorMessage={loadingError} />
    </View>
  );
};
