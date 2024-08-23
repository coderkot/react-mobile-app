export const QualityId: Array<QualityIdData> = [
  { id: '9874 5632', date: '20.05.1999' },
  { id: '1236 5478', date: '18.01.2010' },
  { id: '7412 8963', date: '01.06.2019' },
];

export const ControlMethods: Array<ControlMethodsData> = [
  { id: '1', method: 'MK', level: 2 },
  { id: '12', method: 'MKKKV', level: 1 },
];

export const ControlObjects: Array<ControlObjectsData> = [
  {
    id: '1',
    objectsList: ['object 1', 'object 2', 'object 3', 'object 4'],
  },
  {
    id: '2',
    objectsList: ['object 11', 'object 22'],
  },
];

export const AboutText =
  'Текст о себе о себе о себе о себе о себе о себе о себе о себе о себе о себе о себе о себе о себе о себе о себе о себе о себе о себе о себе о себе о себе о себе о себе о себе о себе о себе о себе о себе о себе о себе о себе о себе о себе';

export const AdditionalCertification =
  'Дополнительные аттестации Дополнительные аттестации Дополнительные аттестации Дополнительные аттестации';

interface QualityIdData {
  id: string;
  date: string;
}
interface ControlMethodsData {
  id: string;
  method: string;
  level: number;
}

interface ControlObjectsData {
  id: string;
  objectsList: Array<string>;
}
