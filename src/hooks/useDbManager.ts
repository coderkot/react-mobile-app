import { executeSql, openDB } from '../services/DataBaseAdapter/SQLiteAdapter';
import { TreeNodeModel } from '../server/models/models';
import { FavoriteTypes } from '../constants/text-constants';

const db = openDB();
export const useDbManager = () => {
  const getAll = (
    params: { search?: string; filter?: FavoriteTypes },
    successCallback?: Function,
    errorCallback?: Function
  ) => {
    executeSql(
      db,
      getSelectQuery(params),
      [],
      prepareData(successCallback),
      errorCallback
    );
  };

  const saveRow = (
    item: ItemRow,
    successCallback?: Function,
    errorCallback?: Function
  ) => {
    const sql =
      'INSERT OR REPLACE INTO favorites (id, name, name_upper, node_id, file_id, link, category, file_type) VALUES (?,?,?, ?, ?, ?, ?, ?)';
    const values = [
      item.id,
      item.name,
      item.name.toLocaleUpperCase(),
      item.nodeId,
      item.fileId,
      item.fileLink,
      item.category,
      item.type,
    ];

    executeSql(db, sql, values, successCallback, errorCallback);
  };

  const deleteRow = (
    fileId: any,
    successCallback?: Function,
    errorCallback?: Function
  ) => {
    const sql = 'DELETE FROM favorites WHERE file_id = ?';
    executeSql(db, sql, [fileId], successCallback, errorCallback);
  };

  const searchRow = (
    fileId?: string,
    successCallback?: Function,
    errorCallback?: Function
  ) => {
    const sql = 'SELECT * FROM favorites where file_id = ?';
    executeSql(db, sql, [fileId], prepareData(successCallback), errorCallback);
  };

  return { getAll, saveRow, deleteRow, searchRow };
};

const prepareData = (callback?: Function) => (result: any) => {
  const data: Array<any> = [];
  const length = result?.rows?.length ?? 0;

  if (callback) {
    for (let i = 0; i < length; i++) {
      data.push(result.rows.item(i));
    }

    callback(data);
  }
};

const getSelectQuery = (params: {
  search?: string;
  filter?: FavoriteTypes;
}): string => {
  let sql = 'SELECT * FROM favorites';
  let category = params.filter ? ` category = '${params.filter}'` : '';
  let search = params.search ? ` name_upper LIKE '%${params.search.toLocaleUpperCase()}%'` : '';
  let and = params.search && params.filter ? ' AND' : '';

  if (params.search || params.filter) {
    sql = `${sql} WHERE${category}${and}${search}`;
  }

  return sql;
};

interface ItemRow extends TreeNodeModel {
  fileLink: string;
}
