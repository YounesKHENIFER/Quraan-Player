import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Search = ({search}) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputBox}>
        <TextInput
          onChangeText={search}
          style={styles.input}
          placeholder="البحث ..."
        />
        <Ionicons name="search" size={20} color="gray" />
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    backgroundColor: '#ddd',
    borderRadius: 15,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  input: {
    width: '100%',
    fontSize: 16,
  },
});
