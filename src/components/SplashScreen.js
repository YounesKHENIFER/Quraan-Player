import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
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
    backgroundColor: '#065951',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
  },
});
