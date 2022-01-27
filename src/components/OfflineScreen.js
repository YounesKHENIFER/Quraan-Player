import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const OfflineScreen = ({setRefresh}) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="wifi-off" size={150} color="#444" />
      <Text style={styles.text}>الرجاء التحقق من إتصال الأنترنت...</Text>
      <TouchableOpacity onPress={() => setRefresh(prev => !prev)}>
        <Text style={styles.refresh}>إعادة المحاولة</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OfflineScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 10,
  },
  refresh: {
    color: '#00796B',
    marginTop: 10,
    fontSize: 18,
  },
});
