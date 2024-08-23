import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { FlatList, View } from 'react-native';
import { Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { DefectStatementItem } from '../../../components/defect-statements/defect-statement-item';
import { SearchTextBox } from '../../../components/education/search-text-box';
import { DefectListStyles } from './style';
import { ListParams } from '../../../server/request-types';
import { defaultRequestParams, isEmpty } from '../../../utils/utils';
import {
  DEFAULT_PAGE_SIZE,
  DEFAULT_REQUEST_SIZE,
} from '../../../constants/setting-constants';
import { useDebounce } from '../../../hooks/useDebounce';
import { getReports } from '../../../redux/thunks';
import { NoData } from '../../../components/no-data';
import { ActionsUser } from '../../../redux/actions';

export const DefectStatementListsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const reports = useSelector<any>((state) => state.userStore.userReports);
  const queryReportsState = useSelector<any>(
    (state) => state.queryStore.queryUserReports
  );
  const [search, setSearch] = useState<any>();
  const [needUpdate, setNeedUpdate] = useState<any>(false);
  const debounceSearch = useDebounce(search, 300);
  const [requestParams, setRequestParams] = useState<ListParams>(
    defaultRequestParams('DESC', 'id')
  );
  const loading = queryReportsState?.loading;
  const error = queryReportsState?.error;

  const getMoreHandler = () => {
    setRequestParams((prev) => ({
      ...prev,
      size: (prev.size ?? 0) + DEFAULT_PAGE_SIZE,
    }));
  };

  useEffect(() => {
    if (requestParams.size > DEFAULT_REQUEST_SIZE || needUpdate) {
      setNeedUpdate(false);
      dispatch(getReports(requestParams));
    }
  }, [requestParams, needUpdate]);

  const handleSearch = (text: string): void => {
    setSearch(text);
  };

  useEffect(() => {
    if (!isEmpty(debounceSearch)) {
      setRequestParams((prev) => ({ ...prev, name: debounceSearch }));
      setNeedUpdate(true);
    }
  }, [debounceSearch]);

  useEffect(() => {
    return () => {
      dispatch({ type: ActionsUser.USER_REPORTS, payload: [] });
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      setNeedUpdate(true);
    }, [])
  );

  return (
    <>
      <View style={{ marginTop: 10 }}>
        <SearchTextBox
          placeholder="Поиск по названию"
          containerStyle={DefectListStyles.searchBar}
          onChangeText={handleSearch}
          value={search}
        />
        {reports?.length > 0 && (
          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            data={reports}
            onEndReachedThreshold={0.1}
            onEndReached={!search ? getMoreHandler : null}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    marginBottom: index === reports.length - 1 ? 240 : 0,
                  }}
                >
                  <DefectStatementItem
                    item={item}
                    onPress={() => {
                      navigation.navigate('DefectStatement', { id: item.id });
                    }}
                  />
                </View>
              );
            }}
          />)
        }
      </View>

      <NoData
        loading={loading}
        data={reports}
        errorMessage={error}
      />

      <View style={DefectListStyles.buttonContainer}>
        <Button
          containerStyle={{
            marginBottom: 90,
          }}
          buttonStyle={DefectListStyles.button}
          titleStyle={DefectListStyles.buttonTitle}
          title="Новая ведомость"
          onPress={() => {
            navigation.navigate('DefectStatement', { id: null });
          }}
        />
      </View>
    </>
  );
};
