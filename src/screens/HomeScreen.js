import {
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  FlatList,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {useScrollToTop, useTheme} from '@react-navigation/native';

import Search from '../components/Search';
import Item from '../components/Item';
import fonts from '../style/fonts';
import initreciters from '../assets/quran_data/reciters.json';
const HomeScreen = ({navigation}) => {
  const flatListRef = useRef();
  useScrollToTop(flatListRef);
  const {colors} = useTheme();
  const [reciters, setReciters] = useState(initreciters);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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

  return (
    <View style={styles.container(colors.background)}>
      <View style={{flex: 1}}>
        {/* search box */}
        <Search search={search} />

        {/* display reciters list */}
        {!loading ? (
          reciters.length ? (
            <FlatList
              ref={flatListRef}
              contentContainerStyle={{paddingHorizontal: 15}}
              keyExtractor={item => `${item.id} - ${item.name}`}
              showsVerticalScrollIndicator={false}
              data={reciters}
              ListHeaderComponent={<View style={{height: 32}} />}
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
