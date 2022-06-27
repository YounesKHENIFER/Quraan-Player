import {ToastAndroid} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function (sura) {
  try {
    const {url, reciterName, title} = sura;
    let dirs = RNFetchBlob.fs.dirs;
    const path = `${dirs.DocumentDir}/quran/suras/${reciterName} - ${title}.mp3`;
    const pathAndroid = `${dirs.DownloadDir}/quran/suras/${reciterName} - ${title}.mp3`;

    // verify that file not exists
    const exist = await RNFetchBlob.fs.exists(pathAndroid);
    if (exist) {
      return ToastAndroid.show('السورة محملة سابقا', ToastAndroid.SHORT);
    }

    // download file
    const res = await RNFetchBlob.config({
      path,
      fileCache: true,
      appendExt: 'mp3',
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        title: `${reciterName} - ${title}`,
        description: `تحميل سورة : ${title}`,
        path: pathAndroid,
      },
    }).fetch('GET', url);

    // download completed msg
    ToastAndroid.show('إكتمل التحميل', ToastAndroid.SHORT);

    // save new suras to player
    const suraPath = res.path();
    const newSura = {
      ...sura,
      url: suraPath,
    };

    let savedSuras = await AsyncStorage.getItem('downloads');
    savedSuras = savedSuras != null ? JSON.parse(savedSuras) : [];
    const surasToSave = JSON.stringify([...savedSuras, newSura]);
    await AsyncStorage.setItem('downloads', surasToSave);
  } catch (error) {
    ToastAndroid.show('ألغي التحميل', ToastAndroid.SHORT);
  }
}

async function checkSavedSuras(suras) {
  const results = await Promise.all(
    suras.map(async sura => {
      const exist = await RNFetchBlob.fs.exists(sura.url);
      return {...sura, exist};
    }),
  );
  return results;
}
export async function getSavedSuras() {
  let savedValue = await AsyncStorage.getItem('downloads');
  const suras = savedValue != null ? JSON.parse(savedValue) : [];
  const checkedSuras = await checkSavedSuras(suras);
  const filteredSuras = checkedSuras.filter(sura => sura.exist);

  // update suras
  await AsyncStorage.setItem('downloads', JSON.stringify(filteredSuras));
  return filteredSuras;
}
