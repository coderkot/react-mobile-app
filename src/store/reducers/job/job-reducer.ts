import { AddOrDeleteFileFromFavoritesActionTypes } from '../../actions/job/add-or-delete-file-from-favorites';
import { CreateDefectStatementActionTypes } from '../../actions/job/create-defect-statement';
import { GetAllAdsActionTypes } from '../../actions/job/get-all-ads';
import { GetAllDefectStatementsActionTypes } from '../../actions/job/get-all-defect-statements';
import { GetAllNodesActionTypes } from '../../actions/job/get-all-nodes';
import { GetDocumentsActionTypes } from '../../actions/job/get-documents-by-id';
import { GetSubNodesActionTypes } from '../../actions/job/get-sub-nodes-by-id';
import { JobActionTypes } from '../../actions/job/job-types';
import { JobState } from './types/job-state';

const initialState: JobState = {
  jobScreenData: {
    error: null,
    isLoading: false,
    nodes: [],
  },
  jobFilesScreenData: {
    error: null,
    isLoading: false,
    documents: [],
  },
  manufacturersProposalsData: {
    error: null,
    isLoading: false,
    ads: [],
  },
  defectStatementScreenData: {
    error: null,
    createError: null,
    isLoading: false,
    isCreating: false,
    defectStatements: [],
  },
};

export const jobReducer = (
  state = initialState,
  action:
    | GetAllNodesActionTypes
    | GetSubNodesActionTypes
    | GetDocumentsActionTypes
    | AddOrDeleteFileFromFavoritesActionTypes
    | GetAllAdsActionTypes
    | GetAllDefectStatementsActionTypes
    | CreateDefectStatementActionTypes
): JobState => {
  switch (action.type) {
    case JobActionTypes.GetAllNodes:
      return {
        ...state,
        jobScreenData: {
          error: null,
          isLoading: true,
          nodes: [],
        },
      };
    case JobActionTypes.GetAllNodesSuccess:
      return {
        ...state,
        jobScreenData: {
          error: null,
          isLoading: false,
          nodes: action.payload,
        },
      };
    case JobActionTypes.GetAllNodesFailure:
      return {
        ...state,
        jobScreenData: {
          error: action.payload,
          isLoading: false,
          nodes: [],
        },
      };

    case JobActionTypes.GetSubNodes:
      return {
        ...state,
        jobScreenData: {
          error: null,
          isLoading: true,
          nodes: [],
        },
      };
    case JobActionTypes.GetSubNodesSuccess:
      return {
        ...state,
        jobScreenData: {
          error: null,
          isLoading: false,
          nodes: action.payload,
        },
      };
    case JobActionTypes.GetSubNodesFailure:
      return {
        ...state,
        jobScreenData: {
          error: action.payload,
          isLoading: false,
          nodes: [],
        },
      };

    case JobActionTypes.GetDocuments:
      return {
        ...state,
        jobFilesScreenData: {
          error: null,
          isLoading: true,
          documents: [],
        },
      };
    case JobActionTypes.GetDocumentsSuccess:
      return {
        ...state,
        jobFilesScreenData: {
          error: null,
          isLoading: false,
          documents: action.payload,
        },
      };
    case JobActionTypes.GetDocumentsFailure:
      return {
        ...state,
        jobFilesScreenData: {
          error: action.payload,
          isLoading: false,
          documents: [],
        },
      };

    case JobActionTypes.AddOrDeleteFileFromFavorites:
      return {
        ...state,
        jobFilesScreenData: {
          ...state.jobFilesScreenData,
          error: null,
          isLoading: true,
        },
      };
    case JobActionTypes.AddOrDeleteFileFromFavoritesSuccess:
      return {
        ...state,
        jobFilesScreenData: {
          error: null,
          isLoading: false,
          documents: state.jobFilesScreenData.documents.map(p => {
            if (p.fieldId === action.payload.fieldId) {
              return { ...action.payload };
            }
            return p;
          }),
        },
      };
    case JobActionTypes.AddOrDeleteFileFromFavoritesFailure:
      return {
        ...state,
        jobFilesScreenData: {
          ...state.jobFilesScreenData,
          error: action.payload,
          isLoading: false,
        },
      };

    case JobActionTypes.GetAllAds:
      return {
        ...state,
        manufacturersProposalsData: {
          ...state.manufacturersProposalsData,
          error: null,
          isLoading: true,
        },
      };
    case JobActionTypes.GetAllAdsSuccess:
      return {
        ...state,
        manufacturersProposalsData: {
          error: null,
          isLoading: false,
          ads: action.payload,
        },
      };
    case JobActionTypes.GetAllAdsFailure:
      return {
        ...state,
        manufacturersProposalsData: {
          error: action.payload,
          isLoading: false,
          ads: [],
        },
      };

    case JobActionTypes.GetAllDefectStatements:
      return {
        ...state,
        defectStatementScreenData: {
          ...state.defectStatementScreenData,
          error: null,
          isLoading: true,
        },
      };
    case JobActionTypes.GetAllDefectStatementsSuccess:
      return {
        ...state,
        defectStatementScreenData: {
          ...state.defectStatementScreenData,
          error: null,
          isLoading: false,
          defectStatements: action.payload,
        },
      };
    case JobActionTypes.GetAllDefectStatementsFailure:
      return {
        ...state,
        defectStatementScreenData: {
          ...state.defectStatementScreenData,
          error: action.payload,
          isLoading: false,
          defectStatements: [],
        },
      };

    case JobActionTypes.CreateDefectStatement:
      return {
        ...state,
        defectStatementScreenData: {
          ...state.defectStatementScreenData,
          createError: null,
          isCreating: true,
        },
      };
    case JobActionTypes.CreateDefectStatementSuccess:
      return {
        ...state,
        defectStatementScreenData: {
          ...state.defectStatementScreenData,
          createError: null,
          isCreating: false,
          defectStatements: [
            ...state.defectStatementScreenData.defectStatements,
            action.payload,
          ],
        },
      };
    case JobActionTypes.CreateDefectStatementFailure:
      return {
        ...state,
        defectStatementScreenData: {
          ...state.defectStatementScreenData,
          createError: action.payload,
          isCreating: false,
        },
      };
    default:
      return state;
  }
};
