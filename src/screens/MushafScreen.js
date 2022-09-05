import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Mushaf from '../services/mushaf';
import SuraText from '../components/SuraText';

const initSuras = Mushaf.getSuras();
const startScroll = 0;
const MushafScreen = ({navigation, route}) => {
  const [currentSura, setCurrentSura] = useState();
  useEffect(() => {
    setCurrentSura(route.params.id - 1);
  }, []);

  const renderItem = useCallback(
    ({item, index}) => <SuraText item={item} />,
    [],
  );
  return (
    <FlatList
      data={initSuras}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      pagingEnabled
      style={{flex: 1}}
      snapToOffsets={initSuras.map((x, i) => {
        return i * SCREEN_W * 114 + startScroll;
      })}
    />
  );
};
const SCREEN_W = Dimensions.get('screen').width;
export default MushafScreen;

const styles = StyleSheet.create({});
