import {StyleSheet, Text, View, TouchableNativeFeedback} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import fonts from '../style/fonts';
import {useTheme} from '@react-navigation/native';

function Item({onPress, title, subTitle}) {
  const {colors} = useTheme();

  return (
    <View style={styles.reciterOuterBox(colors.border)}>
      <TouchableNativeFeedback
        onPress={onPress}
        background={TouchableNativeFeedback.Ripple(colors.primary)}
        style={styles.reciterOuterBox()}>
        {/* navigate to reciter screen */}
        <View style={styles.reciterInnerBox}>
          {/* reciter name */}
          <View style={{alignItems: 'flex-start'}}>
            <Text style={styles.reciterText(colors.text)}>{title}</Text>
            <Text style={styles.subTitle(colors.gray)}>{subTitle}</Text>
          </View>
          <Ionicons name="chevron-back-outline" size={25} color={colors.text} />
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
  reciterOuterBox: borderColor => ({
    paddingVertical: 0,
    borderRadius: 8,
    overflow: 'hidden',
    borderColor,
    borderBottomWidth: 1,
  }),
  reciterText: color => ({
    color,
    fontFamily: fonts.bold,
    fontSize: 16,
  }),
  subTitle: color => ({
    color,
    marginTop: 4,
    fontFamily: fonts.regular,
    fontSize: 14,
  }),
  center: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
