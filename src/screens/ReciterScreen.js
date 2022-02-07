import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useLayoutEffect, useState} from 'react';
import Search from '../components/Search';
import Item from '../components/Item';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../style/colors';
import fonts from '../style/fonts';

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
    navigation.setOptions({
      title: route.params.reciterName,
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
    getSuras();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <Search search={search} />
        {!loading ? (
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
            <View style={styles.center}>
              <Text style={styles.noItemsText}>
                السورة ' {searchTerm} ' غير متوفرة
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

export default ReciterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  center: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  noItemsText: {fontSize: 18, color: colors.gary, fontFamily: fonts.regular},
});
