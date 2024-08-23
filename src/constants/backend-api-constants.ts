export const backendApi = {
  login: '/login',
  logout: '/logout',
  registration: '/registration',
  getUser: '/api/v1/user/',
  generateToken: '/api/v1/user/password/token',
  passwordReset: '/api/v1/user/password/reset',
  tokenResend: '/registration/token/resend/',
  registrationConfirm: '/registration/confirm/',
  getUSer: '/api/v1/user/',
  getProfile: '/api/v1/user/profile',
  resume: '/api/v1/resume',
  changePasswords: '/api/v1/user/password/change',
  userUpdate: '/api/v1/user/update',
  tokenChange: '/api/v1/tokens',
  jobRequestsLists: '/api/v1/job-applications',
  news: '/api/v1/industry-news',
  controlObjects: '/dict/control-object/list',
  controlMethods: '/dict/control-method/list',
  userQualification: '/dict/user-qualifications',
  files: '/files',
  filesDoc: '/files/doc',
  filesVideo: '/files/video',
  treeNode: '/tree/node',
  treeNodeRoots: '/tree/node/roots',
  changeFavoriteFiles: '/api/v1/user/userId/favorite-files',
  qualificationCertificates: '/api/v1/qualification-certificates',
  qualificationMethods: '/api/v1/qualification-methods',
  reports: '/api/v1/reports',
  reportList: '/api/v1/reports/list',
  reportSend: '/api/v1/reports/send',
  images: '/api/v1/images',
  advertising: '/api/v1/advertising',
  support: '/api/v1/technical-supports',
  comment: '/api/v1/technical-supports/addComment',
  photo: '/api/v1/images/profile',
  notifications: '/api/v1/notifications',
  notificationsAllRead: '/api/v1/notifications/mark-read/all',
  notificationsDeleteRead: '/api/v1/notifications/read',
  savePushToken: '/api/v1/user/push-token',
  notificationSettings: '/api/v1/user/notifications',
  favoriteFiles: '/api/v1/user/favorite-files',
};
