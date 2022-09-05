import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const SuraText = ({item}) => {
  return (
    <View style={{flex: 1}}>
      <Text style={styles.text}>{item.content}</Text>
    </View>
  );
};

export default SuraText;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});
