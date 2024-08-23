export enum ProfileMenuItems {
  PERSONAL_DATA = 'Личные данные',
  FAVORITES = 'Избранное',
  CV = 'Резюме',
  HELP = 'Задать вопрос',
  SUBSCRIBE = 'Подписка',
  NOTIFICATIONS_SETTINGS = 'Настройки уведомлений',
}

export enum FavoriteTypes {
  ALL = 'Все',
  NORMATIVE_DOCS = 'Нормативная документация',
  REFERENCE_DOCS = 'Справочная информация',
  SAMPLE_DOCS = 'Образцы документов',
  LAB_CERTIFICATION = 'Аттестация лаборатории',
  PERSONNEL_CERTIFICATION = 'Аттестация персонала',
}

export enum HelpStatus {
  Closed = 'Закрыта',
  Open = 'Открыта',
  Completed = 'Выполнена',
  Work_in_progress = 'В работе',
  Pending = 'В ожидании',
  Canceled = 'Отменена',
}

export enum HelpType {
  SPECIALIST = 'Специалисту',
  TECHNICAL_SUPPORT = 'В техподдержку',
}

export enum ContentType {
  PDF = 'pdf',
  VIDEO = 'video',
}

export const LoggedIn = 'Logged';
