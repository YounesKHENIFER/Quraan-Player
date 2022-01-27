import {StyleSheet, Text, View, TouchableNativeFeedback} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Item = ({onPress, title, subTitle}) => {
  return (
    <View style={styles.reciterOuterBox}>
      <TouchableNativeFeedback
        onPress={onPress}
        background={TouchableNativeFeedback.Ripple('#96D2CB')}
        style={styles.reciterOuterBox}>
        <View style={styles.reciterInnerBox}>
          {/* navigate to reciter screen */}
          <Ionicons name="chevron-back-circle" size={25} color="#00796B" />
          {/* reciter name */}
          <View style={{alignItems: 'flex-end'}}>
            <Text style={styles.reciterText}>{title}</Text>
            <Text>{subTitle}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  reciterInnerBox: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reciterOuterBox: {
    marginBottom: 15,
    backgroundColor: '#ddd',
    borderRadius: 15,
    overflow: 'hidden',
  },
  reciterText: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  center: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
