import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useLayoutEffect, useState} from 'react';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import Item from '../components/Item';

const FavoritesScreen = ({navigation}) => {
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
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useLayoutEffect(() => {
    getFavorites();
  }, []);

  return (
    <View style={styles.container}>
      {!loading ? (
        <View style={{flex: 1}}>
          {favorites.length ? (
            <ScrollView style={{paddingHorizontal: 15}}>
              {favorites.map((favorite, i) => (
                <Item
                  key={`${favorite.id}- ${i}`}
                  title={favorite.title}
                  subTitle={favorite.reciterName}
                  onPress={() =>
                    navigation.push('Player', {
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
            </ScrollView>
          ) : (
            <View style={styles.center}>
              <Text style={styles.noItemsText}>
                لا يوجد عناصر في قائمة المفضلة
              </Text>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#00796B" />
        </View>
      )}
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  center: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  noItemsText: {fontSize: 18, color: '#000'},
});
