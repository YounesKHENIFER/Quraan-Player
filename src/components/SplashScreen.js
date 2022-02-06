import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../style/colors';
const LOGO = require('../assets/logow.png');
const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={LOGO} style={styles.image} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
  },
});
