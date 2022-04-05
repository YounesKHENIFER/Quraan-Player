import {
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useLayoutEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';

import Search from '../components/Search';
import Item from '../components/Item';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import fonts from '../style/fonts';

const HomeScreen = ({navigation}) => {
  const {colors} = useTheme();
  const [initreciters, setinitReciters] = useState([]);
  const [reciters, setReciters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // getting reciters data
  const getReciters = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('https://qurani-api.herokuapp.com/api/reciters');
      const data = await res.json();
      setReciters(data);
      setinitReciters(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // search functinality
  const search = useCallback(
    term => {
      if (!term.trim()) {
        setSearchTerm('');
        setReciters(initreciters);
      } else {
        setSearchTerm(term);
        const searched = initreciters.filter(item => item.name.includes(term));
        setReciters(searched);
      }
    },
    [initreciters, loading],
  );

  // initial fetch of reciters
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 20,
          }}
          onPress={() => navigation.push('Favorite')}>
          <MaterialCommunityIcons name="heart-outline" size={24} color="#fff" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 20,
          }}
          onPress={() => navigation.push('Infos')}>
          <MaterialCommunityIcons
            name="information-outline"
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
      ),
    });
    if (!reciters.length) getReciters();
  }, [navigation]);

  return (
    <View style={styles.container(colors.background)}>
      <View style={{flex: 1}}>
        {/* search box */}
        <Search search={search} />

        {/* display reciters list */}
        {!loading ? (
          reciters.length ? (
            <FlatList
              contentContainerStyle={{paddingHorizontal: 15}}
              keyExtractor={item => `${item.id} - ${item.name}`}
              showsVerticalScrollIndicator={false}
              data={reciters}
              ListHeaderComponent={() => <View style={{height: 32}} />}
              renderItem={({item}) => (
                <Item
                  title={item.name}
                  subTitle={`${item.count} سورة`}
                  onPress={() =>
                    navigation.push('Reciter', {
                      reciterName: item.name,
                      reciterId: item.id,
                    })
                  }
                />
              )}
            />
          ) : searchTerm ? (
            // if there is no reciters with search term
            <View style={styles.center}>
              <Text style={styles.noItemsText(colors.gray)}>
                لا يوجد قارئ بإسم : ' {searchTerm} '
              </Text>
            </View>
          ) : null
        ) : (
          // loading indicator
          <View style={styles.center}>
            <ActivityIndicator size="large" color={colors.gray} />
          </View>
        )}
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: backgroundColor => ({
    flex: 1,
    backgroundColor,
  }),
  center: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  noItemsText: color => ({fontSize: 18, color, fontFamily: fonts.regular}),
});
