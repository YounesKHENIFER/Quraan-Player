import React, {useEffect, useState} from 'react';
import {I18nManager} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import RNRestart from 'react-native-restart';

import OfflineScreen from './components/OfflineScreen';
import SplashScreen from './components/SplashScreen';

import {ThemeProvider} from './style/useToggleTheme';
import {LogBox} from 'react-native';
import Index from './navigations/Index';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

try {
  I18nManager.allowRTL(true);
  I18nManager.forceRTL(true);
} catch (e) {
  console.log(e);
}
export default function App() {
  const [connected, setConnected] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  // Subscribe

  useEffect(() => {
    if (!I18nManager.isRTL) {
      RNRestart.Restart();
    }
    const unsub = NetInfo.addEventListener(state => {
      setConnected(state.isConnected && state.isInternetReachable);
      setLoading(false);
    });
    return () => {
      unsub();
    };
  }, [refresh]);

  // if loading display splash screen
  if (loading) {
    return <SplashScreen />;
  }

  // if not connection found display offline screen
  if (!connected) {
    return <OfflineScreen setRefresh={setRefresh} />;
  }
  // lunch the app
  return (
    <ThemeProvider>
      <Index />
    </ThemeProvider>
  );
}
