import React, {useEffect} from 'react';
import {I18nManager} from 'react-native';
import RNRestart from 'react-native-restart';

import {ThemeProvider} from './style/useToggleTheme';
import {LogBox} from 'react-native';
import Index from './navigations/Index';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);
LogBox.ignoreLogs([
  'Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle.',
]);

try {
  I18nManager.allowRTL(true);
  I18nManager.forceRTL(true);
} catch (e) {}
export default function App() {
  useEffect(() => {
    if (!I18nManager.isRTL) {
      RNRestart.Restart();
    }
  }, []);
  // lunch the app
  return (
    <ThemeProvider>
      <Index />
    </ThemeProvider>
  );
}
