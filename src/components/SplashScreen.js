import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
export default function () {
  useEffect(() => {
    return () => {
      SplashScreen.hide();
    };
  }, []);

  return null;
}
