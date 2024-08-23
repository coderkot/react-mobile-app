import React, { useCallback, useRef, useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SearchTextBox } from '../../../components/education/search-text-box';
import FavoriteIcon from '../../../assets/icons/svg/in-favorite.svg';
import { colors } from '../../../main-styles';
import { FavoriteTypes } from '../../../constants/text-constants';
import { styles } from './styles';
import { PdfViewer } from '../../../components/pdf-viewer';
import { Modal } from '../../../components/education/modal';
import { useDispatch, useSelector } from 'react-redux';
import { TreeNodeModel, UserProfileModel } from '../../../server/models/models';
import {
  requestFavouritesFiles,
  requestGetDocFile,
  requestGetVideoFile,
} from '../../../server/requests';
import { ActionsService } from '../../../redux/actions';
import {
  DocumentTypes,
  PopUpTypeConstants,
} from '../../../constants/type-constants';
import { MaterialIndicator } from 'react-native-indicators';
import { VideoPlayer } from '../../../components/VideoPlayer/VideoPlayer';
import { ListParams } from '../../../server/request-types';
import { getErrorObject, isEmpty } from '../../../utils/utils';
import {
  DEFAULT_PAGE_SIZE,
  DEFAULT_REQUEST_SIZE,
} from '../../../constants/setting-constants';
import { useDebounce } from '../../../hooks/useDebounce';
import { useFocusEffect } from '@react-navigation/native';
import { Item } from 'react-native-picker-select';
import { SelectBox } from '../../../components/SelectBox/SelectBox';
import { Offline } from './offline';
import { useFavorites } from '../../../hooks/useFavorites';
import { NoData } from '../../../components/no-data';
import { ErrorTitleConstants } from '../../../constants/errors-constant';

export const Favorites = () => {
  const [items, setItems] = useState<Array<TreeNodeModel>>();
  const offlineMode = useSelector<any>(
    (state) => state.serviceStore.offlineMode
  );
  const [searchResults, setSearchResults] = useState(0);
  const profile = useSelector<any>((state) => state.userStore.userProfile);
  const [openFile, setOpenFile] = useState<string>('');
  const [filter, setFilter] = useState(FavoriteTypes.ALL);
  const [modalTitle, setModalTitle] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingError, setLoadingError] = useState<string>('');
  const [fileLoading, setFileLoading] = useState<boolean>(false);
  const [isDoc, setIsDoc] = useState<boolean>();
  const [types, setTypes] = useState<Array<Item>>();
  const [showOffline, setShowOffline] = useState<boolean>(false);
  const [requestParams, setRequestParams] = useState<ListParams>({
    page: 0,
    size: DEFAULT_REQUEST_SIZE,
  });
  const [search, setSearch] = useState<any>();
  const debounceSearch = useDebounce(search, 500);
  const dispatch = useDispatch();
  const modalRef = useRef<any>();
  const { deleteFromFavorite } = useFavorites(profile as UserProfileModel);

  const getList = () => {
    setLoading(true);
    setLoadingError('');
    requestFavouritesFiles(requestParams)
      .then((response) => {
        if (response.status == 200) {
          setItems(response.data.items);
          setSearchResults(response.data.items.length);
        } else {
          dispatch(getErrorObject());
          setLoadingError(ErrorTitleConstants.SERVER_ERROR);
        }
      })
      .finally(() => setLoading(false));
  };

  const handleFilter = (value: string): void => {
    setRequestParams((prev) => {
      const newParams = { ...prev };
      if (value === 'Все') {
        delete newParams.category;
      } else {
        newParams.category = value;
      }

      return newParams;
    });
  };

  const handleSearch = (text: string): void => {
    setSearch(text);
  };

  const handleClick = (id: string) => {
    const node = (profile as UserProfileModel).favoriteFiles?.find(
      (item) => item.id == Number(id)
    );

    if (node?.fileId) {
      const isDocType = node?.type == DocumentTypes.DOC;
      setIsDoc(isDocType);
      setModalTitle(node.name);
      modalRef.current.openModal();

      const request = isDocType
        ? requestGetDocFile(node.fileId, node.nodeId)
        : requestGetVideoFile(node.fileId, node.nodeId);

      setFileLoading(true);
      request
        .then((response) => {
          if (response.status == 200) {
            setOpenFile(isDocType ? response.data : response.data.url);
          } else {
            dispatch({
              type: ActionsService.SHOW_POPUP,
              payload: {
                message: 'Не удалось загрузить документ',
                type: PopUpTypeConstants.ERROR,
              },
            });
          }
        })
        .finally(() => setFileLoading(false));
    }
  };

  const getMoreHandler = () => {
    setRequestParams((prev) => ({
      ...prev,
      size: (prev.size ?? 0) + DEFAULT_PAGE_SIZE,
    }));
  };

  useEffect(() => {
    if (!isEmpty(debounceSearch)) {
      setRequestParams((prev) => ({ ...prev, search: debounceSearch }));
    }
  }, [debounceSearch]);

  useEffect(() => {
    if (requestParams.size > DEFAULT_REQUEST_SIZE) {
      getList();
    }
  }, [requestParams]);

  useFocusEffect(
    useCallback(() => {
      getList();
    }, [])
  );

  useEffect(() => {
    const result = Object.values(FavoriteTypes).map((item) => {
      return {
        label: item,
        value: item,
      };
    });
    setTypes(result);
  }, []);

  useEffect(() => {
    if (offlineMode) {
      setShowOffline(true);
    }
  }, [offlineMode]);

  return (
    <>
      {showOffline ? (
        <Offline
          setIsDocCallback={setIsDoc}
          modalRef={modalRef}
          setModalTitleCallback={setModalTitle}
          setOpenFileCallback={setOpenFile}
          offlineMode={offlineMode as boolean}
          setFileLoadingCallback={setFileLoading}
          callBack={() => {
            setShowOffline(false);
            getList();
          }}
        />
      ) : (
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
                    handleFilter(value);
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
              onEndReachedThreshold={0.1}
              onEndReached={getMoreHandler}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 220 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.favoriteItem}
                  onPress={() => handleClick(item?.id.toString())}
                >
                  <Text style={styles.favoriteTitle}>{item.name}</Text>
                  <TouchableOpacity
                    onPress={() => deleteFromFavorite(item, getList)}
                  >
                    <FavoriteIcon />
                  </TouchableOpacity>
                </TouchableOpacity>
              )}
            />
          )}

          <NoData loading={loading} data={items} errorMessage={loadingError} />
        </View>
      )}

      <Modal
        ref={modalRef}
        title={modalTitle}
        onClose={() => {
          modalRef.current.closeModal();
          setOpenFile('');
          setModalTitle('');
        }}
      >
        {fileLoading ? (
          <View style={{ alignSelf: 'center', height: 50, zIndex: 9999 }}>
            <MaterialIndicator color={colors.blue} />
          </View>
        ) : isDoc ? (
          <PdfViewer type={'base64'} src={openFile} />
        ) : (
          <VideoPlayer source={openFile} />
        )}
      </Modal>
    </>
  );
};
