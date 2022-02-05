import {StyleSheet, Text, View, TouchableNativeFeedback} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

function Item({onPress, title, subTitle}) {
  return (
    <View style={styles.reciterOuterBox}>
      <TouchableNativeFeedback
        onPress={onPress}
        background={TouchableNativeFeedback.Ripple('#96D2CB')}
        style={styles.reciterOuterBox}>
        {/* navigate to reciter screen */}
        <View style={styles.reciterInnerBox}>
          {/* reciter name */}
          <View style={{alignItems: 'flex-start'}}>
            <Text style={styles.reciterText}>{title}</Text>
            <Text>{subTitle}</Text>
          </View>
          <Ionicons name="chevron-back-circle-outline" size={25} color="#00796B" />
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
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reciterOuterBox: {
    marginBottom: 8,
    backgroundColor: '#f0f1f7',
    borderRadius: 8,
    overflow: 'hidden',
  },
  reciterText: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  center: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
