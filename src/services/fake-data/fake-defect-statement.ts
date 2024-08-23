import { DefectStatement } from '../../types/defect-statement';

export const fakeDefectStatements: DefectStatement[] = [
  {
    id: '1',
    name: 'Название ведомости 1',
    createdDate: new Date(2021, 4, 3, 0, 0, 0, 0),
    address: 'Адрес объекта 1',
    defects: [
      {
        id: '1',
        construction: 'Конструкция 1',
        location: 'Расположение 1',
        description: 'Описание 1',
        recommendation: 'Рекомендации 1',
      },
      {
        id: '2',
        construction: 'Конструкция 2',
        location: 'Расположение 2',
        description: 'Описание 2',
        recommendation: 'Рекомендации 2',
      },
    ],
  },
  {
    id: '2',
    name: 'Название ведомости 2',
    createdDate: new Date(2021, 4, 3, 0, 0, 0, 0),
    address: 'Адрес объекта 2',
    defects: [
      {
        id: '1',
        construction: 'Конструкция 1',
        location: 'Расположение 1',
        description: 'Описание 1',
        recommendation: 'Рекомендации 1',
      },
      {
        id: '2',
        construction: 'Конструкция 2',
        location: 'Расположение 2',
        description: 'Описание 2',
        recommendation: 'Рекомендации 2',
      },
    ],
  },
  {
    id: '3',
    name: 'Название ведомости 3',
    createdDate: new Date(2021, 4, 3, 0, 0, 0, 0),
    address: 'Адрес объекта 3',
    defects: [
      {
        id: '1',
        construction: 'Конструкция 1',
        location: 'Расположение 1',
        description: 'Описание 1',
        recommendation: 'Рекомендации 1',
      },
      {
        id: '2',
        construction: 'Конструкция 2',
        location: 'Расположение 2',
        description: 'Описание 2',
        recommendation: 'Рекомендации 2',
      },
    ],
  },
];
