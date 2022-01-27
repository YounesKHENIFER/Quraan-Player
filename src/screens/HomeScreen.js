import {
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  FlatList,
} from 'react-native';
import React, {useCallback, useLayoutEffect, useState} from 'react';
import Search from '../components/Search';
import Item from '../components/Item';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
        <MaterialCommunityIcons
          name="heart"
          size={30}
          color="#ed1432"
          onPress={() => navigation.push('Favorite')}
        />
      ),
      headerLeft: () => (
        <MaterialCommunityIcons
          name="information-outline"
          size={30}
          color="black"
          onPress={() => navigation.push('Infos')}
        />
      ),
    });
    if (!reciters.length) getReciters();
  }, []);
  return (
    <View style={styles.container}>
      {!loading ? (
        <View style={{flex: 1}}>
          <Search search={search} />
          {reciters.length ? (
            <FlatList
              contentContainerStyle={{paddingHorizontal: 15}}
              keyExtractor={item => `${item.id} - ${item.name}`}
              data={reciters}
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
          ) : null}
        </View>
      ) : (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#00796B" />
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  center: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  noItemsText: {fontSize: 18, color: '#000'},
});
