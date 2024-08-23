import { useEffect } from 'react';
import { useDbManager } from './useDbManager';
import { useFileManager } from './useFileManager';
import { TreeNodeModel } from '../server/models/models';
import { getFileRequestURL } from '../utils/utils';

export function useSyncFavorites(favoriteFiles: Array<TreeNodeModel>) {
  const { getAll, deleteRow, saveRow } = useDbManager();
  const { saveFile, deleteFile } = useFileManager();

  useEffect(() => {
    const syncCallback = (data: any) => {
      if (favoriteFiles) {
        const existFileIds: Array<any> = [];

        data.forEach((item: any) => {
          const hasFiles = favoriteFiles.find(
            (file: any) => file.fileId === item.file_id
          );

          if (hasFiles) {
            existFileIds.push(item.file_id);
          } else {
            deleteFile(item.link, () => deleteRow(item.file_id));
          }
        });

        favoriteFiles.forEach((item: TreeNodeModel) => {
          if (!existFileIds.includes(item.fileId)) {
            saveFile(getFileRequestURL(item), (link: string) =>
              saveRow({ ...item, fileLink: link })
            );
          }
        });
      }
    };

    getAll({}, syncCallback);
  }, [favoriteFiles]);
}
