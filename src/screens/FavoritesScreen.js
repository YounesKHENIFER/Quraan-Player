import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useLayoutEffect, useState} from 'react';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import {useIsFocused, useTheme} from '@react-navigation/native';

import Item from '../components/Item';
import fonts from '../style/fonts';

const FavoritesScreen = ({navigation}) => {
  const isFocused = useIsFocused();

  const {colors} = useTheme();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // getting favorites list
  const getFavorites = useCallback(async () => {
    try {
      setLoading(true);
      let savedValue = await AsyncStorageLib.getItem('favorites');
      const fav = savedValue != null ? JSON.parse(savedValue) : [];
      setFavorites(fav);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, []);

  useLayoutEffect(() => {
    getFavorites();
  }, [isFocused]);

  return (
    <View style={styles.container(colors.background)}>
      {!loading ? (
        // render favorites suras
        <View style={{flex: 1}}>
          {/* header */}
          <View style={styles.header(colors.primary)} />
          {/* data */}
          {favorites.length ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{paddingHorizontal: 15, paddingTop: 12, marginTop: 8}}>
              {favorites.map((favorite, i) => (
                <Item
                  key={`${favorite.id}- ${i}`}
                  title={favorite.title}
                  subTitle={favorite.reciterName}
                  onPress={() =>
                    navigation.navigate('Player', {
                      suras: favorites,
                      reciterName: favorite.reciterName,
                      rewaya: favorite.rewaya,
                      suraUrl: favorite.url,
                      suraId: favorite.id,
                      suraName: favorite.title,
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
                لا يوجد عناصر في قائمة المفضلة
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

export default FavoritesScreen;

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
