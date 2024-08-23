import RNFetchBlob from 'rn-fetch-blob';
const dirs = RNFetchBlob.fs.dirs;

export function useFileManager(openFile?: Function) {
  const pathToGeneralFolder = dirs.DocumentDir + '/favorites';

  const getFile = (path: string) => {
    RNFetchBlob.fs.readStream(path, 'utf8').then((stream) => {
      let data = '';
      stream.open();
      stream.onData((chunk) => {
        data += chunk;
      });
      stream.onEnd(() => {
        openFile && openFile(data);
      });
    });
  };

  const saveFile = (link: string, save: Function) => {
    let name = link.slice(link.lastIndexOf('/'), link.lastIndexOf('?'));
    RNFetchBlob.config({
      path: pathToGeneralFolder + name,
    })
      .fetch('GET', link, {})
      .then((res) => {
        save(res.data);
      });
  };

  const deleteFile = (path: string, callback?: Function) => {
    RNFetchBlob.fs
      .unlink(path)
      .then(() => {
        callback && callback();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return { saveFile, getFile, deleteFile };
}
