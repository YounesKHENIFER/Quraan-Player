import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import fonts from '../style/fonts';
import {useTheme} from '@react-navigation/native';

const OfflineScreen = ({setRefresh}) => {
  const {
    colors: {primary},
  } = useTheme();
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="wifi-off" size={120} color={primary} />
      <Text style={styles.text(primary)}>
        الرجاء التحقق من إتصال الأنترنت...
      </Text>
      <TouchableOpacity onPress={() => setRefresh(prev => !prev)}>
        <Text style={styles.refresh(primary)}>إعادة المحاولة</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OfflineScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: color => ({
    marginTop: 20,
    fontSize: 18,
    fontFamily: fonts.regular,
    color,
  }),
  refresh: color => ({
    color,
    marginTop: 10,
    fontSize: 18,
    fontFamily: fonts.bold,
  }),
});
