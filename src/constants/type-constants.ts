export enum DocumentTypes {
  DOC = 'DOC',
  VIDEO = 'VIDEO',
}

export enum NotificationTypes {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
}

export enum ServerNameRoles {
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_MASTER = 'ROLE_MASTER',
  ROLE_COMPANY = 'ROLE_COMPANY',
  ROLE_PREMIUM_MASTER = 'ROLE_PREMIUM_MASTER',
}

export enum TreeNodeNames {
  DOCUMENTATION = 'Документация',
  LEARNING = 'Обучение',
  LABORATORY_ATTESTATION = 'Аттестация лаборатории',
  PERSONAL_ATTESTATION = 'Аттестация персонала',
}

export enum PopUpTypeConstants {
  WARNING = 'warning',
  ERROR = 'error',
  INFO = 'info',
  SUCCESS = 'success',
}

export enum LoginTypes {
  PHONE = 'PHONE',
  EMAIL = 'EMAIL',
}

export enum ProjectTypes {
  SPECIALIST = 'SPECIALIST',
  TECHNICAL_SUPPORT = 'TECHNICAL_SUPPORT',
}

export enum TaskTypes {
  CHANGE = 'CHANGE',
  INCIDENT = 'INCIDENT',
  PROBLEM = 'PROBLEM',
  SERVICE_REQUEST = 'SERVICE_REQUEST',
  SERVICE_REQUEST_WITH_APPROVALS = 'SERVICE_REQUEST_WITH_APPROVALS',
}

export enum StatusTasksTypes {
  CLOSE = 'Closed',
  OPEN = 'Open',
  RESOLVE = 'Completed',
  IN_WORK = 'Work in progress',
  PENDING = 'Pending',
  CANCELED = 'Canceled',
}

export enum NotificationMessageType {
  NEWS = 'NEWS',
  JOB_APP = 'JOB_APP',
  DOC = 'DOC',
  NEW_ANSWER = 'NEW_ANSWER',
  ADMIN_MESSAGE = 'ADMIN_MESSAGE',
}

export enum PopUpZone {
  AUTH = 'AUTH',
}
