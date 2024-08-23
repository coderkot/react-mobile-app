import { useDispatch } from 'react-redux';
import { getRootNodes } from '../redux/thunks';
import { TreeNodeNames } from '../constants/type-constants';

export const useTreeNodes = (
  TreeNodeNames: TreeNodeNames,
  setDataCallback: Function,
  sortingOrder?: Array<string>,
  setLoadingError?: Function,
  setLoading?: Function,
  setVisibleSearch?: Function
) => {
  const dispatch = useDispatch();

  const getTreeNodes = () =>
    dispatch(
      getRootNodes(
        TreeNodeNames,
        setDataCallback,
        sortingOrder,
        setLoadingError,
        setLoading,
        setVisibleSearch
      )
    );

  return { getTreeNodes };
};
