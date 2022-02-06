import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import fonts from '../style/fonts';
import colors from '../style/colors';

const Search = ({search}) => {
  return (
    <>
      <View style={styles.container} />
      <View style={styles.inputBox}>
        <TextInput
          onChangeText={search}
          style={styles.input}
          placeholder="البحث ..."
        />
        <Ionicons name="search" size={20} color={colors.gary} />
      </View>
    </>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomStartRadius: 12,
    borderBottomEndRadius: 12,
    height: 36,
    backgroundColor: colors.primary,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    alignSelf: 'center',
    width: '92%',
    backgroundColor: '#fff',
    borderRadius: 50,
    paddingHorizontal: 12,
    height: 44,
    position: 'absolute',
    top: 12,
    zIndex: 99,
    borderColor: colors.primary,
    // borderWidth: 0.5,
  },
  input: {
    // width: '100%',
    flex: 1,
    fontSize: 16,
    textAlign: 'right',
    fontFamily: fonts.regular,
    color: colors.text,
  },
});
