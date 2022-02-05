import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
const LOGO = require('../assets/logo.png');
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
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
  },
});
