import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useLayoutEffect, useState} from 'react';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import Item from '../components/Item';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../style/colors';
import fonts from '../style/fonts';

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
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="arrow-right"
            size={24}
            color={colors.gary}
          />
        </TouchableOpacity>
      ),
      headerLeft: () => <View />,
    });
    getFavorites();
  }, [navigation]);

  return (
    <View style={styles.container}>
      {!loading ? (
        <View style={{flex: 1}}>
          <View style={styles.header} />
          {favorites.length ? (
            <ScrollView showsVerticalScrollIndicator={false} style={{paddingHorizontal: 15, paddingTop: 12, marginTop: 8}}>
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
              <View style={{height: 20}} />
            </ScrollView>
          ) : (
            <View style={styles.center}>
              <View style={styles.header} />
              <Text style={styles.noItemsText}>
                لا يوجد عناصر في قائمة المفضلة
              </Text>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.center}>
          <View style={styles.header} />
          <ActivityIndicator size="large" color={colors.gary} />
        </View>
      )}
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  center: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  noItemsText: {fontSize: 18, color: colors.gary, fontFamily: fonts.regular},
  header: {
    height: 20,
    borderBottomStartRadius: 12,
    borderBottomEndRadius: 12,
    width: '100%',
    backgroundColor: colors.primary,
    position: 'absolute',
    top: -12,
  },
});
