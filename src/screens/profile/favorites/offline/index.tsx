import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import NotConnection from '../../../../assets/icons/svg/offline.svg';
import { SearchTextBox } from '../../../../components/education/search-text-box';
import { styles } from '../styles';
import { SelectBox } from '../../../../components/SelectBox/SelectBox';
import { colors } from '../../../../main-styles';
import { FavoriteTypes } from '../../../../constants/text-constants';
import { Item } from 'react-native-picker-select';
import { useDebounce } from '../../../../hooks/useDebounce';
import { SuccessView } from '../../../../components/SuccessView/SuccessView';
import { BottomSheet } from '../../../../components/bottom-sheet';
import { useFileManager } from '../../../../hooks/useFileManager';
import { useDbManager } from '../../../../hooks/useDbManager';
import { useNavigation } from '@react-navigation/native';
import { OfflineStyles } from './styles';
import { PopUpTypeConstants } from '../../../../constants/type-constants';
import { Popup } from '../../../../components/popup';
import { NoData } from '../../../../components/no-data';

export const Offline: React.FC<OfflineProps> = (props) => {
  const {
    setIsDocCallback,
    modalRef,
    setModalTitleCallback,
    setOpenFileCallback,
    setFileLoadingCallback,
  } = props;
  const [items, setItems] = useState<Array<any>>([]);
  const [searchResults, setSearchResults] = useState(0);
  const [filter, setFilter] = useState(FavoriteTypes.ALL);
  const [types, setTypes] = useState<Array<Item>>([]);
  const [search, setSearch] = useState<any>();
  const debounceSearch = useDebounce(search, 500);
  const successRef = useRef<any>();
  const navigation = useNavigation();
  const popupRef = useRef<any>();

  const { getFile } = useFileManager((file: any) => {
    if (file.indexOf('INTERNAL_SERVER_ERROR') === -1) {
      setOpenFileCallback(file);
      setIsDocCallback(true);
      setFileLoadingCallback(false);
    } else {
      popupRef?.current?.show();
    }
  });
  const { getAll } = useDbManager();

  const handleClick = (item: any) => {
    setFileLoadingCallback(true);
    setModalTitleCallback(item.name);
    modalRef.current?.openModal();

    getFile(item.link);
  };

  const handleClose = () => {
    navigation.setOptions({ headerShown: true });
    props.callBack();
  };

  const handleSearch = (text: string): void => {
    setSearch(text);
  };

  const getList = () => {
    const resultFilter = filter == FavoriteTypes.ALL ? undefined : filter;

    getAll({ search: debounceSearch, filter: resultFilter }, (result: any) => {
      setItems(result);
      setSearchResults(result.length);
    });
  };

  useEffect(() => {
    if (!props.offlineMode) {
      successRef.current.open();
    }
  }, [props.offlineMode]);

  useEffect(() => {
    const result = Object.values(FavoriteTypes).map((item) => {
      return {
        label: item,
        value: item,
      };
    });
    setTypes(result);
    navigation.setOptions({ headerShown: false });
  }, []);

  useEffect(() => {
    getList();
  }, [debounceSearch, filter]);

  return (
    <View>
      <View style={OfflineStyles.header}>
        <Text style={OfflineStyles.headerText}>Избранное</Text>
      </View>
      <View style={{ paddingTop: 16 }}>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <NotConnection />
          <Text style={{ fontSize: 18, fontWeight: '400' }}>
            Нет подключения
          </Text>
          <Text style={{ width: '70%', textAlign: 'center' }}>
            Во время отсутствия подключения доступны только избранные документы
          </Text>
        </View>

        <View>
          <SearchTextBox
            onChangeText={handleSearch}
            containerStyle={styles.searchContainer}
            value={search}
          />
          <View
            style={{
              ...styles.controlContainer,
              flexDirection: 'row',
              marginBottom: 20,
            }}
          >
            <Text>Найдено: {searchResults}</Text>
            <View
              style={{
                alignSelf: 'flex-end',
                width: '50%',
              }}
            >
              {types && (
                <SelectBox
                  list={types}
                  value={filter}
                  placeholder={{}}
                  change={(value) => {
                    setFilter(value);
                  }}
                  dropdownIconColor={colors.blue}
                />
              )}
            </View>
          </View>
          {items?.length > 0 && (
            <FlatList
              data={items}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 600 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.favoriteItem}
                  key={item.id}
                  onPressIn={() => handleClick(item)}
                >
                  <Text style={styles.favoriteTitle}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          )}
          <NoData data={items} />
        </View>
        <BottomSheet
          ref={successRef}
          title={'Подключение восстановлено'}
          height={350}
          onCloseCallback={() => handleClose()}
        >
          <SuccessView
            title={'Доступны все функции'}
            close={() => {
              successRef.current.close();
            }}
          />
        </BottomSheet>
        <Popup
          ref={popupRef}
          message={
            'Произошла ошибка в момент сохранения данных. Добавьте документ в избранное еще раз.'
          }
          type={PopUpTypeConstants.ERROR}
        />
      </View>
    </View>
  );
};

interface OfflineProps {
  offlineMode: boolean;
  callBack: Function;
  setIsDocCallback: Function;
  modalRef: any;
  setModalTitleCallback: Function;
  setOpenFileCallback: Function;
  setFileLoadingCallback: Function;
}
