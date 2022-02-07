import {StyleSheet, Text, View, TouchableNativeFeedback} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import fonts from '../style/fonts';
import colors from '../style/colors';

function Item({onPress, title, subTitle}) {
  return (
    <View style={styles.reciterOuterBox}>
      <TouchableNativeFeedback
        onPress={onPress}
        background={TouchableNativeFeedback.Ripple(colors.gary + '4f')}
        style={styles.reciterOuterBox}>
        {/* navigate to reciter screen */}
        <View style={styles.reciterInnerBox}>
          {/* reciter name */}
          <View style={{alignItems: 'flex-start'}}>
            <Text style={styles.reciterText}>{title}</Text>
            <Text style={styles.subTitle}>{subTitle}</Text>
          </View>
          <Ionicons name="chevron-back-outline" size={25} color={colors.gary} />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

export default Item;

const styles = StyleSheet.create({
  reciterInnerBox: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reciterOuterBox: {
    paddingVertical: 0,
    backgroundColor: colors.secondary,
    borderRadius: 8,
    overflow: 'hidden',
    borderColor: colors.gary + '4f',
    borderBottomWidth: 1,
  },
  reciterText: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 16,
  },
  subTitle: {
    marginTop: 4,
    fontFamily: fonts.regular,
    fontSize: 14,
  },
  center: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
