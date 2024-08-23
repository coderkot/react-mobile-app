import SQLite, { SQLError, SQLiteDatabase } from 'react-native-sqlite-storage';
SQLite.DEBUG(false);
SQLite.enablePromise(false);

const successOpen = () => {
  console.log('open db success!');
};

const errorOpen = (error: SQLError) => {
  console.log('error in opening db: ' + error);
};

export const closeDB = (db: SQLiteDatabase) => {
  if (db) {
    db.close(successOpen, errorOpen);
    console.log('db was close');
  } else {
    console.log('db was not opened');
  }
};

export const createTable = (db: SQLiteDatabase) => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS ' +
        'favorites ' +
        '(id INTEGER,' +
        ' name TEXT NOT NULL,' +
        ' name_upper TEXT NOT NULL,' +
        ' node_id INTEGER,' +
        ' file_id TEXT NOT NULL UNIQUE,' +
        ' link TEXT NOT NULL,' +
        ' category TEXT NOT NULL,' +
        ' file_type TEXT NOT NULL);',
      []
    );
  });
};

export const openDB = () => {
  const db = SQLite.openDatabase(
    {
      name: 'diagnost_offline.db',
      location: 'default',
    },
    () => successOpen(),
    (error) => errorOpen(error)
  );

  createTable(db);

  return db;
};

export const executeSql = (
  db: SQLiteDatabase,
  sql: string,
  params: Array<any>,
  successCallback?: any,
  errorCallback?: any
) => {
  db.transaction((tx) => {
    tx.executeSql(
      sql,
      params,
      (tx, res) => {
        if (successCallback) {
          successCallback(res);
        }
      },
      (error) => {
        if (errorCallback) {
          errorCallback(error);
        }
      }
    );
  });
};

// на  время разработки
export const dropTable = (db: SQLiteDatabase) => {
  db.transaction((tx) => {
    tx.executeSql(
      'DROP TABLE IF EXISTS favorites',
      [],
      () => {
        console.log('Table favorites droped! ');
      },
      (error: any) => {
        console.log('DROP TABLE error = ', error);
      }
    );
  });
};
