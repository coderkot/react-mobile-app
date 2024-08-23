import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Modal } from '../education/modal';
import { PdfViewer } from '../pdf-viewer';
import { SubItemStyles } from './styles';
import {
  useNavigation,
  useNavigationState,
  useRoute,
} from '@react-navigation/native';
import { TreeNodeModel, UserProfileModel } from '../../server/models/models';
import {
  requestGetDocFile,
  requestGetTreeNodeById,
  requestGetVideoFile,
} from '../../server/requests';
import {
  DocumentTypes,
  PopUpTypeConstants,
  TreeNodeNames,
} from '../../constants/type-constants';
import { useDispatch, useSelector } from 'react-redux';
import { ActionsService } from '../../redux/actions';
import { MaterialIndicator } from 'react-native-indicators';
import { colors } from '../../main-styles';
import { StarIcon } from '../common/start-icon';
import { SearchTextBox } from '../education/search-text-box';
import { ContentType } from '../../constants/text-constants';
import { VideoPlayer } from '../VideoPlayer/VideoPlayer';
import { Crumbs } from '../crumbs';
import { useFavorites } from '../../hooks/useFavorites';
import { NoData } from '../no-data';
import { ErrorTitleConstants } from '../../constants/errors-constant';
import { DEFAULT_NODES_LENGTH } from '../../constants/setting-constants';

export const SubItem = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const [nodeList, setNodeList] = useState<Array<TreeNodeModel>>([]);
  const [linkFile, setLinkFile] = useState<string>('');
  const [modalTitle, setModalTitle] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const profile = useSelector<any>((state) => state.userStore.userProfile);
  const [searchValue, setSearchValue] = useState<string>('');
  const [contentType, setContentType] = useState<string>(ContentType.PDF);
  const modalRef = useRef<any>();
  const state = useNavigationState((state) => state);
  const { addInFavorite, deleteFromFavorite } = useFavorites(
    profile as UserProfileModel
  );
  const [crumbs, setCrumbs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState<string>('');
  const [visibleSearch, setVisibleSearch] = useState(false);
  const [searchCount, setSearchCount] = useState<number>(0);
  const [showCount, setShowCount] = useState<boolean>(false);
  const [fileIdForOpen, setFileIdForOpen] = useState<string>('');

  useEffect(() => {
    const fileId = route.params?.fileId;
    if (fileId) {
      setFileIdForOpen(fileId);
    }
  }, [route]);

  useEffect(() => {
    const crumbs = state?.routes
      ?.filter((item) => item.name === 'SubItem')
      ?.map((item) => ({
        path: '',
        name: item?.params?.title,
        id: item?.params?.id,
        onPress: () => navigation.navigate({ name: item.name, key: item.key }),
      }));

    if (route.params.showCrumbs && crumbs?.length > 0) {
      setCrumbs(crumbs);
    }
  }, [route.params.id]);

  useEffect(() => {
    if (fileIdForOpen && nodeList.length > 0) {
      setFileIdForOpen('');
      const item = nodeList?.find((node) => node.fileId === fileIdForOpen);
      if (item) {
        touchHandler(item);
      }
    }
  }, [fileIdForOpen, nodeList]);

  useLayoutEffect(() => {
    navigation.setOptions({ title: route.params.title });
  });

  const resultNodes = useMemo(() => {
    if (!searchValue) {
      return nodeList;
    } else {
      return nodeList.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
  }, [nodeList, searchValue]);

  useEffect(() => {
    if (searchValue) {
      setShowCount(true);
      setSearchCount(resultNodes.length);
    }
  }, [resultNodes]);

  const createNodes = () => {
    const id = route.params.id;
    setLoading(true);
    requestGetTreeNodeById(id)
      .then((response) => {
        if (response.status === 200) {
          const nodes = [...response.data.leaves, ...response.data.children];
          setNodeList(nodes);
          setVisibleSearch(nodes.length > DEFAULT_NODES_LENGTH);
        } else {
          setLoadingError(ErrorTitleConstants.SERVER_ERROR);
        }
      })
      .finally(() => setLoading(false));
    setSearchValue('');
    setShowCount(false);
  };

  useEffect(() => {
    createNodes();
  }, [route.params.id]);

  const touchHandler = (item: TreeNodeModel) => {
    if (item.fileId) {
      setModalTitle(item.name);
      modalRef.current.openModal();
      setIsLoading(true);

      const isDoc = item.type === DocumentTypes.DOC;
      isDoc
        ? setContentType(ContentType.PDF)
        : setContentType(ContentType.VIDEO);

      const request = isDoc
        ? requestGetDocFile(item.fileId, item.nodeId as number)
        : requestGetVideoFile(item.fileId, item.nodeId as number);

      request.then((response) => {
        if (response.status === 200) {
          setLinkFile(isDoc ? response.data : response.data.url);
          setIsLoading(false);
        } else {
          dispatch({
            type: ActionsService.SHOW_POPUP,
            payload: {
              message: 'Не удалось загрузить документ',
              type: PopUpTypeConstants.ERROR,
            },
          });
        }
      });
    } else {
      navigation.push('SubItem', {
        id: item.id,
        name: item.name,
        title: item.name,
        routeType: route.params.routeType,
        showCrumbs: route.params.showCrumbs,
      });
    }
  };

  const handleSearch = (text: string) => {
    setSearchValue(text);
  };

  const getModalContent = () => {
    if (isLoading) {
      return (
        <View style={{ alignSelf: 'center', height: 50, zIndex: 9999 }}>
          <MaterialIndicator color={colors.blue} />
        </View>
      );
    } else {
      return contentType === ContentType.PDF ? (
        <PdfViewer type={'base64'} src={linkFile} />
      ) : (
        <VideoPlayer source={linkFile} />
      );
    }
  };

  const getFavoriteIcon = (item: TreeNodeModel) => {
    const isFavorite = profile.favoriteFiles
      ? !!profile.favoriteFiles.find(
          (favoriteItem) => favoriteItem.id === item.id
        )
      : false;

    if (item.fileId && route.params.routeType !== TreeNodeNames.LEARNING) {
      return isFavorite ? (
        <StarIcon isActive={true} onPress={() => deleteFromFavorite(item)} />
      ) : (
        <StarIcon isActive={false} onPress={() => addInFavorite(item)} />
      );
    }
  };

  return (
    <View>
      {crumbs?.length > 0 && <Crumbs crumbs={crumbs} />}
      {visibleSearch && (
        <>
          <SearchTextBox
            placeholder="Поиск по названию"
            containerStyle={SubItemStyles.searchBar}
            onChangeText={handleSearch}
            onClear={createNodes}
            value={searchValue}
          />
          {showCount && (
            <Text style={{ marginLeft: 16, marginTop: 10 }}>
              Найдено: {searchCount}
            </Text>
          )}
        </>
      )}

      {resultNodes?.length > 0 && (
        <FlatList
          data={resultNodes}
          keyExtractor={(item) => item.id}
          style={{ marginTop: 16 }}
          contentContainerStyle={{ paddingBottom: 220 }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => touchHandler(item)}>
                <ListItem containerStyle={SubItemStyles.itemContainer}>
                  <ListItem.Content>
                    <ListItem.Title style={SubItemStyles.itemTitle}>
                      {item.name}
                    </ListItem.Title>
                  </ListItem.Content>

                  {getFavoriteIcon(item)}
                </ListItem>
              </TouchableOpacity>
            );
          }}
        />
      )}

      <NoData
        loading={loading}
        data={resultNodes}
        errorMessage={loadingError}
      />

      <Modal
        ref={modalRef}
        onClose={() => {
          modalRef.current.closeModal();
          setModalTitle('');
        }}
        title={modalTitle}
      >
        {getModalContent()}
      </Modal>
    </View>
  );
};
