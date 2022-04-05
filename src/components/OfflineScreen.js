import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import fonts from '../style/fonts';

const OfflineScreen = ({setRefresh}) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#065951" />
      <MaterialCommunityIcons name="wifi-off" size={120} color="#fff" />
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
    backgroundColor: '#065951',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    fontFamily: fonts.regular,
    color: '#fff',
  },
  refresh: {
    color: '#fff',
    marginTop: 10,
    fontSize: 18,
    fontFamily: fonts.bold,
  },
});
