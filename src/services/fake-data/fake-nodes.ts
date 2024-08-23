import { Leaf } from '../../types/node/leaf';
import { LeafType } from '../../types/node/leaf-type';
import { Node } from '../../types/node/node';

const createFakeFile = (
  fileId: string,
  uri: string,
  leafType: LeafType = LeafType.Doc
): Leaf => {
  return {
    fieldId: fileId,
    name: `Файл ${new Date().getMilliseconds()}${fileId}`,
    type: leafType,
    uri: uri,
    isFavorited: false,
  };
};

const createNode = (
  id: string,
  parentId: string | null,
  name: string,
  hasLeaves: boolean,
  hasChildren: boolean
): Node => {
  return {
    id: id,
    parentId: parentId,
    name: name,
    hasLeaves: hasLeaves,
    hasChildren: hasChildren,
  };
};

export const createRootWithChildrenEducationService = (): Node[] => {
  return [
    createNode('1', null, 'Методические материалы', false, true),
    createNode('2', null, 'Видео материалы', false, true),
    createNode('3', null, 'Вопросы для самопроверки', false, true),
  ];
};

export const createSubNodesForId1EducationService = (
  parentId: string
): Node[] => {
  return [
    createNode('11', parentId, 'Метод 1', false, true),
    createNode('22', parentId, 'Метод 2', false, true),
    createNode('33', parentId, 'Метод 3', false, true),
  ];
};

export const createSubNodesForId11createSubNodesForId1EducationService = (
  parentId: string
): Node[] => {
  return [
    createNode('111', parentId, 'Подметод 1', true, false),
    createNode('222', parentId, 'Подметод 2', true, false),
  ];
};

export const createLeafsForId111createSubNodesForId1EducationService =
  (): Leaf[] => {
    const pdfUri =
      'https://www.fotosklad.ru/upload/iblock/a6c/542f1f4deb06905ff752ec8f4d1a928b.pdf';
    return [
      createFakeFile('111_1', pdfUri, LeafType.Doc),
      createFakeFile(
        '111_2',
        'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        LeafType.Video
      ),
      createFakeFile('111_3', pdfUri, LeafType.Doc),
      createFakeFile(
        '111_4',
        'http://qthttp.apple.com.edgesuite.net/1010qwoeiuryfg/sl.m3u8',
        LeafType.Video
      ),
      createFakeFile('111_5', pdfUri, LeafType.Doc),
      createFakeFile(
        '111_6',
        'http://demo.unified-streaming.com/video/tears-of-steel/tears-of-steel.ism/.m3u8',
        LeafType.Video
      ),
      createFakeFile('111_7', pdfUri, LeafType.Doc),
      createFakeFile('111_8', pdfUri, LeafType.Doc),
      createFakeFile('111_9', pdfUri, LeafType.Doc),
      createFakeFile('111_10', pdfUri, LeafType.Doc),
    ];
  };

export const createAllNodesJobService = (): Node[] => {
  return [
    createNode('1', null, 'Нормативная документация', false, true),
    createNode('2', null, 'Справочная информация', false, true),
    createNode('3', null, 'Образцы документов', false, true),
  ];
};

export const createSubNodesJobServiceForId1 = (parentId: string): Node[] => {
  return [
    createNode('11', parentId, 'Общая документация', true, false),
    createNode('22', parentId, 'Метод 1', true, false),
    createNode('33', parentId, 'Метод 2', true, false),
    createNode('44', parentId, 'Метод 3', true, false),
  ];
};

export const createDocuments = (): Leaf[] => {
  const pdfUri =
    'https://www.fotosklad.ru/upload/iblock/a6c/542f1f4deb06905ff752ec8f4d1a928b.pdf';
  return [
    createFakeFile('111_1', pdfUri, LeafType.Doc),
    createFakeFile('111_3', pdfUri, LeafType.Doc),
    createFakeFile('111_5', pdfUri, LeafType.Doc),
    createFakeFile('111_7', pdfUri, LeafType.Doc),
    createFakeFile('111_8', pdfUri, LeafType.Doc),
    createFakeFile('111_9', pdfUri, LeafType.Doc),
    createFakeFile('111_10', pdfUri, LeafType.Doc),
  ];
};
