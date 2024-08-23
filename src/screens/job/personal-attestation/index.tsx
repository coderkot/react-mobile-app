import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { JobStyles } from '../styles';
import { SvgIcon } from '../../../components/svg-icon';
import { colors } from '../../../main-styles';
import { useNavigation } from '@react-navigation/native';
import { TreeNodeModel } from '../../../server/models/models';
import { TreeNodeNames } from '../../../constants/type-constants';
import { SearchTextBox } from '../../../components/education/search-text-box';
import DocumentationIcon from '../../../assets/icons/svg/documentation.svg';
import { useDebounce } from '../../../hooks/useDebounce';
import { isEmpty } from '../../../utils/utils';
import { useTreeNodes } from '../../../hooks/useTreeNodes';
import { NoData } from '../../../components/no-data';

export const PersonalAttestation = () => {
  const navigation = useNavigation();
  const [tree, setTree] = useState<Array<TreeNodeModel>>([]);
  const [search, setSearch] = useState('');
  const debounceSearch = useDebounce(search, 500);
  const [loadingError, setLoadingError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [visibleSearch, setVisibleSearch] = useState<boolean>(false);

  const { getTreeNodes } = useTreeNodes(
    TreeNodeNames.PERSONAL_ATTESTATION,
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
    <View style={{ marginTop: 24, flexDirection: 'column', flex: 1 }}>
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
          data={tree}
          style={{ marginTop: 16 }}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('SubItem', {
                  id: item.id,
                  title: item.name,
                })
              }
            >
              <ListItem bottomDivider containerStyle={JobStyles.menuItems}>
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
