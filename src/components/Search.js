import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import fonts from '../style/fonts';

const Search = ({search}) => {
  const {colors} = useTheme();

  return (
    <>
      <View style={styles.container(colors.primary)} />
      <View style={styles.inputBox(colors.inputBackground)}>
        <TextInput
          onChangeText={search}
          style={styles.input(colors.text)}
          placeholder="البحث ..."
          placeholderTextColor={colors.gray}
        />
        <Ionicons name="search" size={20} color={colors.gray} />
      </View>
    </>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: backgroundColor => ({
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomStartRadius: 12,
    borderBottomEndRadius: 12,
    height: 36,
    backgroundColor,
    elevation: 8,
  }),
  inputBox: backgroundColor => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    alignSelf: 'center',
    width: '92%',
    backgroundColor,
    borderRadius: 50,
    paddingHorizontal: 12,
    height: 44,
    position: 'absolute',
    top: 12,
    zIndex: 99,
    elevation: 8,
  }),
  input: color => ({
    flex: 1,
    fontSize: 16,
    textAlign: 'right',
    fontFamily: fonts.regular,
    color,
  }),
});
