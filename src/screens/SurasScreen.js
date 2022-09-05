import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Mushaf from '../services/mushaf';
import Search from '../components/Search';
import Item from '../components/Item';
import {useScrollToTop, useTheme} from '@react-navigation/native';
import fonts from '../style/fonts';

const initSuras = Mushaf.getSurasList();
const SurasScreen = ({navigation}) => {
  const flatListRef = useRef();
  useScrollToTop(flatListRef);
  const {colors} = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [suras, setSuras] = useState(initSuras);

  // search functinality
  const search = useCallback(
    term => {
      if (!term.trim()) {
        setSearchTerm('');
        setSuras(suras);
      } else {
        setSearchTerm(term);
        const searched = suras.filter(item => item.name_ar.includes(term));
        setSuras(searched);
      }
    },
    [initSuras],
  );

  return (
    <View style={styles.container(colors.background)}>
      {/* search box */}
      <Search search={search} />
      {/* display reciters list */}
      {suras.length ? (
        <FlatList
          ref={flatListRef}
          contentContainerStyle={{paddingHorizontal: 15}}
          keyExtractor={item => `${item.id} - ${item.name}`}
          showsVerticalScrollIndicator={false}
          data={suras}
          ListHeaderComponent={() => <View style={{height: 32}} />}
          renderItem={({item: sura}) => (
            <Item
              title={`سورة ${sura.name_ar}`}
              subTitle={`سورة ${sura.class} و آياتها ${sura.verses_number}`}
              onPress={() =>
                navigation.navigate('Mushaf', {
                  id: sura.id,
                  name_ar: sura.name_ar,
                })
              }
            />
          )}
        />
      ) : searchTerm ? ( // if there is no reciters with search term
        <View style={styles.center}>
          <Text style={styles.noItemsText(colors.gray)}>
            لا يوجد قارئ بإسم : ' {searchTerm} '
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default SurasScreen;

const styles = StyleSheet.create({
  container: backgroundColor => ({
    flex: 1,
    backgroundColor,
  }),
  center: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  noItemsText: color => ({fontSize: 18, color, fontFamily: fonts.regular}),
});
