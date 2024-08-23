import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Badge } from '../../../components/badge';
import { colors } from '../../../main-styles';
import { SearchTextBox } from '../../../components/education/search-text-box';
import { HelpStatus, HelpType } from '../../../constants/text-constants';
import { SvgIcon } from '../../../components/svg-icon';
import { styles } from './styles';
import { Button } from 'react-native-elements';
import { BottomSheet } from '../../../components/bottom-sheet';
import { HelpAddForm } from './form';
import {
  badgeColors,
  defaultRequestParams,
  isEmpty,
} from '../../../utils/utils';
import { ListParams } from '../../../server/request-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  DEFAULT_BADGE_COLOR,
  DEFAULT_PAGE_SIZE,
} from '../../../constants/setting-constants';
import { getHelpTasks } from '../../../redux/thunks';
import { PagedEntities, SupportTaskModel } from '../../../server/models/models';
import { useDebounce } from '../../../hooks/useDebounce';
import { NoData } from '../../../components/no-data';

// @ts-ignore
export const HelpMenu = ({ navigation }) => {
  const dispatch = useDispatch();
  const [requestParams, setRequestParams] = useState<ListParams>(
    defaultRequestParams('DESC', 'id')
  );
  const sheetRef = useRef<any>();
  const flatListRef = useRef<any>();
  const tasks = useSelector<any>((state) => state.userStore.userQuestions);
  const queryTasksState = useSelector<any>(
    (state) => state.queryStore.queryUserQuestions
  );
  const [search, setSearch] = useState<string>();
  const debounceSearch = useDebounce(search, 300);

  const handleSearch = (text: string): void => {
    setSearch(text);
  };

  const getAllTasks = () => {
    dispatch(getHelpTasks(requestParams));
  };

  const getMoreHandler = () => {
    setRequestParams((prev) => ({
      ...prev,
      size: (prev.size ?? 0) + DEFAULT_PAGE_SIZE,
    }));
  };

  useEffect(() => {
    getAllTasks();
  }, [requestParams]);

  useEffect(() => {
    if (!isEmpty(debounceSearch)) {
      setRequestParams((prev) => ({ ...prev, title: debounceSearch }));
    }
  }, [debounceSearch]);

  return (
    <View style={{ flex: 1 }}>
      <SearchTextBox
        onChangeText={handleSearch}
        containerStyle={styles.searchContainer}
        placeholder={'Поиск по теме'}
        value={search}
      />
      {tasks?.items?.length > 0 && (
        <FlatList
          ref={flatListRef}
          onContentSizeChange={() =>
            flatListRef.current.scrollToOffset({ animated: true, offset: 0 })
          }
          data={(tasks as PagedEntities<SupportTaskModel>).items}
          extraData={tasks}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 140,
          }}
          onEndReached={getMoreHandler}
          onEndReachedThreshold={0.1}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('HelpView', { id: item.id })}
            >
              <View style={styles.itemContainer}>
                <View style={styles.itemHeaderContainer}>
                  <Text style={styles.helpType}>
                    {HelpType[item.projectType]}
                  </Text>
                  <Text style={styles.helpDate}>{item.createdAt}</Text>
                  <Badge
                    title={parseWorkValue(item.status)}
                    color={badgeColors.get(item.status) ?? DEFAULT_BADGE_COLOR}
                  />
                </View>

                <View style={styles.itemContentContainer}>
                  <Text style={styles.title}>{item.title}</Text>
                  <View style={{ paddingRight: 10 }}>
                    <SvgIcon color={colors.middleGray} icon={'goto'} />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      <NoData
        loading={queryTasksState?.loading}
        data={tasks?.items}
        errorMessage={queryTasksState?.error}
      />

      <View style={styles.newQuestionContainer}>
        <Button
          title={'Новый вопрос'}
          buttonStyle={styles.newQuestionButton}
          onPress={() => sheetRef.current.open()}
        />
      </View>

      <BottomSheet
        title={'Новый вопрос'}
        ref={sheetRef}
        contentContainerStyle={{ paddingHorizontal: 0 }}
        height={Dimensions.get('screen').height - 120}
      >
        <HelpAddForm ref={sheetRef} />
      </BottomSheet>
    </View>
  );
};

export const parseWorkValue = (value: string) => {
  const result = value.replace(/ /g, '_');
  // @ts-ignore
  return HelpStatus[result] ?? HelpStatus.Pending;
};
