import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { AdItem } from '../../../components/ad-item';
import { SearchTextBox } from '../../../components/education/search-text-box';
import { styles } from './style';
import { useNavigation } from '@react-navigation/native';
import { ListParams } from '../../../server/request-types';
import { defaultRequestParams, flattenMethods } from '../../../utils/utils';
import { requestGetAdvertisingList } from '../../../server/requests';
import { DEFAULT_PAGE_SIZE } from '../../../constants/setting-constants';
import { colors } from '../../../main-styles';
import { SelectBox } from '../../../components/SelectBox/SelectBox';
import { Item } from 'react-native-picker-select';
import { useSelector } from 'react-redux';
import { NoData } from '../../../components/no-data';
import { ErrorTitleConstants } from '../../../constants/errors-constant';

export const ManufacturersProposalsScreen = () => {
  const navigation = useNavigation();
  const [types, setTypes] = useState<Array<Item>>([]);
  const [typesDocument, setTypesDocument] = useState<string>('Все');
  const [advertisingList, setAdvertisingList] = useState<any>({});
  const [searchResults, setSearchResults] = useState(0);
  const [search, setSearch] = useState('');
  const controlMethods = useSelector<any>(
    (state) => state.serviceStore.controlMethods
  );
  const [requestParams, setRequestParams] = useState<ListParams>({
    ...defaultRequestParams('DESC', 'createdAt'),
    isPublished: true,
  });
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState<string>('');

  useEffect(() => {
    setLoading(true);
    setLoadingError('');
    requestGetAdvertisingList(requestParams)
      .then((response) => {
        if (response.status === 200) {
          setAdvertisingList(response.data.items);
          setSearchResults(response.data.items.length);
        } else {
          setLoadingError(ErrorTitleConstants.SERVER_ERROR);
        }
      })
      .finally(() => setLoading(false));
  }, [requestParams]);

  useEffect(() => {
    if (controlMethods) {
      setTypes([
        { key: 'all', value: '', label: 'Все' },
        ...flattenMethods(controlMethods),
      ]);
    }
  }, [controlMethods]);

  const getMoreAdvertisingHandler = () => {
    setRequestParams((prev) => ({
      ...prev,
      size: (prev.size ?? 0) + DEFAULT_PAGE_SIZE,
    }));
  };

  const handleChangeTypes = (value: string) => {
    if (value !== 'Все') {
      setRequestParams((prev) => ({
        ...prev,
        method: value,
      }));
    } else {
      setRequestParams((prev) => {
        if (prev.method) {
          delete prev.method;
        }
        return { ...prev };
      });
    }
    //@ts-ignore
    setTypesDocument(value);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setRequestParams((prev) => ({ ...prev, title: value }));
  };

  return (
    <View
      style={{
        marginTop: 10,
      }}
    >
      <SearchTextBox
        containerStyle={styles.searchTextBox}
        placeholder="Поиск по заголовку..."
        onChangeText={(text) => handleSearch(text)}
        value={search}
      />
      <View style={styles.controlContainer}>
        <Text style={{ marginTop: 5 }}>Найдено: {searchResults}</Text>
        <View
          style={{
            alignSelf: 'flex-end',
            width: '50%',
          }}
        >
          <SelectBox
            list={types}
            change={(value) => {
              handleChangeTypes(value);
            }}
            styles={{
              height: 50,
            }}
            placeholder={{}}
            value={typesDocument}
            dropdownIconColor={colors.blue}
          />
        </View>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        data={advertisingList}
        onEndReached={getMoreAdvertisingHandler}
        onEndReachedThreshold={0.1}
        renderItem={({ item, index }) => {
          return (
            <AdItem
              data={item}
              showShortDescription={true}
              onPress={() =>
                navigation.navigate('ManufacturersProposalsDetail', {
                  adId: item.id,
                })
              }
              style={
                index === advertisingList.length - 1
                  ? { marginBottom: 230 }
                  : {}
              }
            />
          );
        }}
      />

      <NoData
        loading={loading}
        data={advertisingList}
        errorMessage={loadingError}
      />
    </View>
  );
};
