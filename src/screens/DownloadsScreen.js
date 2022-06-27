import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useLayoutEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useTheme} from '@react-navigation/native';

import Item from '../components/Item';
import fonts from '../style/fonts';
import RNFetchBlob from 'rn-fetch-blob';
import {getSavedSuras} from '../utils/downloadAudio';

const DownloadsScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  const {colors} = useTheme();
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);

  // getting downloads list
  const getDownloads = useCallback(async () => {
    try {
      setLoading(true);
      //get saved suras
      const suras = await getSavedSuras();

      setDownloads(suras);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, []);

  useLayoutEffect(() => {
    getDownloads();
  }, [isFocused]);

  return (
    <View style={styles.container(colors.background)}>
      {!loading ? (
        // render downloads suras
        <View style={{flex: 1}}>
          {/* header */}
          <View style={styles.header(colors.primary)} />
          {/* data */}
          {downloads.length ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{paddingHorizontal: 15, paddingTop: 12, marginTop: 8}}>
              {downloads.map((sura, i) => (
                <Item
                  key={`${sura.id}- ${i}`}
                  title={sura.title}
                  subTitle={sura.reciterName}
                  onPress={() =>
                    navigation.navigate('Player', {
                      suras: downloads,
                      reciterName: sura.reciterName,
                      suraUrl: sura.url,
                      suraId: sura.id,
                      suraName: sura.title,
                    })
                  }
                />
              ))}
              <View style={{height: 20}} />
            </ScrollView>
          ) : (
            // if no items found
            <View style={styles.center}>
              <View style={styles.header} />
              <Text style={styles.noItemsText(colors.text)}>
                لا يوجد عناصر في قائمة التحميلات
              </Text>
            </View>
          )}
        </View>
      ) : (
        // loading indicator
        <View style={styles.center}>
          <View style={styles.header(colors.primary)} />
          <ActivityIndicator size="large" color={colors.gray} />
        </View>
      )}
    </View>
  );
};

export default DownloadsScreen;

const styles = StyleSheet.create({
  container: backgroundColor => ({
    flex: 1,
    backgroundColor,
  }),
  center: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  noItemsText: color => ({fontSize: 18, color, fontFamily: fonts.regular}),
  header: backgroundColor => ({
    height: 20,
    borderBottomStartRadius: 12,
    borderBottomEndRadius: 12,
    width: '100%',
    backgroundColor,
    position: 'absolute',
    top: -12,
  }),
});
