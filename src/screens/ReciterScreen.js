import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useLayoutEffect, useState} from 'react';
import Search from '../components/Search';
import Item from '../components/Item';

const ReciterScreen = ({navigation, route}) => {
  const [suras, setSuras] = useState([]);
  const [initSuras, setInitSuras] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const getSuras = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://qurani-api.herokuapp.com/api/reciters/${route.params.reciterId}`,
      );
      const data = await res.json();
      const costumSuras = data.surasData.map(sura => ({
        url: sura.url,
        title: sura.name,
        id: sura.id,
        rewaya: data.rewaya,
        reciterName: data.name,
      }));
      setSuras(costumSuras);
      setInitSuras(costumSuras);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const search = useCallback(
    term => {
      if (term.trim()) {
        setSearchTerm(term);
        const searched = initSuras.filter(item => item.title.includes(term));
        setSuras(searched);
      } else {
        setSearchTerm('');
        setSuras(initSuras);
      }
    },
    [initSuras],
  );

  useLayoutEffect(() => {
    navigation.setOptions({title: route.params.reciterName});
    getSuras();
  }, []);

  return (
    <View style={styles.container}>
      {!loading ? (
        <View style={{flex: 1}}>
          <Search search={search} />
          {suras.length ? (
            <FlatList
              // initialNumToRender={suras.length}
              contentContainerStyle={{paddingHorizontal: 15}}
              keyExtractor={item => `${item.id}`}
              data={suras}
              renderItem={({item}) => (
                <Item
                  title={item.title}
                  subTitle={item.rewaya}
                  onPress={() =>
                    navigation.push('Player', {
                      suras: suras,
                      reciterName: item.reciterName,
                      rewaya: item.rewaya,
                      suraUrl: item.url,
                      suraId: item.id,
                      suraName: item.title,
                    })
                  }
                />
              )}
            />
          ) : searchTerm ? (
            <View style={styles.center}>
              <Text style={styles.noItemsText}>
                السورة ' {searchTerm} ' غير متوفرة
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

export default ReciterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  center: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  noItemsText: {fontSize: 18, color: '#000'},
});
