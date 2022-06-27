import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useLayoutEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';

import Search from '../components/Search';
import Item from '../components/Item';

import fonts from '../style/fonts';

const ReciterScreen = ({navigation, route}) => {
  const {colors} = useTheme();

  const [suras, setSuras] = useState([]);
  const [initSuras, setInitSuras] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // getting reciter's suras
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
    } finally {
      setLoading(false);
    }
  }, []);

  // search functionality
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

  // initial FETCH
  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.reciterName,
    });
    getSuras();
  }, []);

  return (
    <View style={styles.container(colors.background)}>
      <View style={{flex: 1}}>
        {/* SEARCH BOX */}
        <Search search={search} />
        {!loading ? (
          // render suras
          suras.length ? (
            <FlatList
              // initialNumToRender={suras.length}
              contentContainerStyle={{paddingHorizontal: 15}}
              keyExtractor={item => `${item.id}`}
              data={suras}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={() => <View style={{height: 32}} />}
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
            // if there is no suras with serch term
            <View style={styles.center}>
              <Text style={styles.noItemsText(colors.gray)}>
                السورة ' {searchTerm} ' غير متوفرة
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

export default ReciterScreen;

const styles = StyleSheet.create({
  container: backgroundColor => ({
    flex: 1,
    backgroundColor,
  }),
  center: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  noItemsText: color => ({fontSize: 18, color, fontFamily: fonts.regular}),
});
