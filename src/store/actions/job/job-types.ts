export enum JobActionTypes {
  GetAllNodes = '[Job] GetAllDocuments',
  GetAllNodesSuccess = '[Job] GetAllNodes success',
  GetAllNodesFailure = '[Job] GetAllNodes failure',

  GetSubNodes = '[Job] GetSubNodes',
  GetSubNodesSuccess = '[Job] GetSubNodes success',
  GetSubNodesFailure = '[Job] GetSubNodes failure',

  GetDocuments = '[Job] GetDocuments',
  GetDocumentsSuccess = '[Job] GetDocuments success',
  GetDocumentsFailure = '[Job] GetDocuments failure',

  AddOrDeleteFileFromFavorites = '[Job] AddOrDeleteFileFromFavorites',
  AddOrDeleteFileFromFavoritesSuccess = '[Job] AddOrDeleteFileFromFavorites success',
  AddOrDeleteFileFromFavoritesFailure = '[Job] AddOrDeleteFileFromFavorites failure',

  GetAllAds = '[Job] GetAllAds',
  GetAllAdsSuccess = '[Job] GetAllAds success',
  GetAllAdsFailure = '[Job] GetAllAds failure',

  GetAllDefectStatements = '[Job] GetAllDefectStatements',
  GetAllDefectStatementsSuccess = '[Job] GetAllDefectStatements success',
  GetAllDefectStatementsFailure = '[Job] GetAllDefectStatements failure',

  CreateDefectStatement = '[Job] CreateDefectStatement',
  CreateDefectStatementSuccess = '[Job] CreateDefectStatement success',
  CreateDefectStatementFailure = '[Job] CreateDefectStatement failure',
}
