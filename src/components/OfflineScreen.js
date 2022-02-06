import {StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import fonts from '../style/fonts';
import colors from '../style/colors';

const OfflineScreen = ({setRefresh}) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <MaterialCommunityIcons name="wifi-off" size={120} color={colors.gary} />
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
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 20,
    fontFamily: fonts.regular,
    color: colors.secondaryText,
  },
  refresh: {
    color: colors.primary,
    marginTop: 10,
    fontSize: 18,
    fontFamily: fonts.regular,
  },
});
