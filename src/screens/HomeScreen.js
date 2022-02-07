import {
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useLayoutEffect, useState} from 'react';
import Search from '../components/Search';
import Item from '../components/Item';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../style/colors';
import fonts from '../style/fonts';

const HomeScreen = ({navigation}) => {
  const [initreciters, setinitReciters] = useState([]);
  const [reciters, setReciters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.push('Favorite')}>
          <MaterialCommunityIcons
            name="heart-outline"
            size={24}
            color={colors.secondary}
          />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.push('Infos')}>
          <MaterialCommunityIcons
            name="information-outline"
            size={24}
            color={colors.secondary}
          />
        </TouchableOpacity>
      ),
    });
    if (!reciters.length) getReciters();
  }, [navigation]);
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <Search search={search} />
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
            <View style={styles.center}>
              <Text style={styles.noItemsText}>
                لا يوجد قارئ بإسم : ' {searchTerm} '
              </Text>
            </View>
          ) : null
        ) : (
          <View style={styles.center}>
            <ActivityIndicator size="large" color={colors.gary} />
          </View>
        )}
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  center: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  noItemsText: {fontSize: 18, color: colors.gary, fontFamily: fonts.regular},
});
