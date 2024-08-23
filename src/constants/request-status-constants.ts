export enum RequestStatusConstants {
  IDLE = 'Черновик',
  WAITING = 'Ждет подтверждения',
  ARCHIVE = 'Архив',
  PUBLISHED = 'Опубликовано',
}

export enum RequestStatusTypeConstants {
  IDLE = 'IDLE',
  WAITING = 'WAITING',
  ARCHIVE = 'ARCHIVE',
  PUBLISHED = 'PUBLISHED',
}

export const GoodRequestStatus = [200, 201, 204];
