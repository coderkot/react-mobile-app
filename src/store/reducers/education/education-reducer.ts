import { EducationActionTypes } from '../../actions/education/education-types';
import { GetAllRootNodesActionTypes } from '../../actions/education/get-all-root-nodes';
import { GetLeafsActionTypes } from '../../actions/education/get-leafs-by-id';
import { GetSubNodesActionTypes } from '../../actions/education/get-sub-nodes-by-id';
import { EducationState } from './types/education-state';

const initialState: EducationState = {
  educationScreenData: {
    error: null,
    isLoading: false,
    rootNodes: [],
  },
  educationFilesScreenData: {
    error: null,
    isLoading: false,
    leafs: [],
  },
};

export const educationReducer = (
  state = initialState,
  action:
    | GetAllRootNodesActionTypes
    | GetSubNodesActionTypes
    | GetLeafsActionTypes
): EducationState => {
  switch (action.type) {
    case EducationActionTypes.GetAllRootNodes:
      return {
        ...state,
        educationScreenData: {
          error: null,
          isLoading: true,
          rootNodes: [],
        },
      };
    case EducationActionTypes.GetAllRootNodesSuccess:
      return {
        ...state,
        educationScreenData: {
          error: null,
          isLoading: false,
          rootNodes: action.payload,
        },
      };
    case EducationActionTypes.GetAllRootNodesFailure:
      return {
        ...state,
        educationScreenData: {
          error: action.payload,
          isLoading: false,
          rootNodes: [],
        },
      };

    case EducationActionTypes.GetSubNodes:
      return {
        ...state,
        educationScreenData: {
          error: null,
          isLoading: true,
          rootNodes: [],
        },
      };
    case EducationActionTypes.GetSubNodesSuccess:
      return {
        ...state,
        educationScreenData: {
          error: null,
          isLoading: false,
          rootNodes: action.payload,
        },
      };
    case EducationActionTypes.GetSubNodesFailure:
      return {
        ...state,
        educationScreenData: {
          error: action.payload,
          isLoading: false,
          rootNodes: [],
        },
      };

    case EducationActionTypes.GetLeafs:
      return {
        ...state,
        educationFilesScreenData: {
          error: null,
          isLoading: true,
          leafs: [],
        },
      };
    case EducationActionTypes.GetLeafsSuccess:
      return {
        ...state,
        educationFilesScreenData: {
          error: null,
          isLoading: false,
          leafs: action.payload,
        },
      };
    case EducationActionTypes.GetLeafsFailure:
      return {
        ...state,
        educationFilesScreenData: {
          error: action.payload,
          isLoading: false,
          leafs: [],
        },
      };

    default:
      return state;
  }
};
