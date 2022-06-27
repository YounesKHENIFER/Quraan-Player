import React, {
  useCallback,
  useContext,
  createContext,
  useEffect,
  useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from '../components/SplashScreen';

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  const [isDark, setisDark] = useState(false);
  const [themeLoading, setThemeLoading] = useState(true);

  // getting app theme from local storage
  const getTheme = useCallback(async () => {
    try {
      const isDark = await AsyncStorage.getItem('AppTheme');
      setIsDark(JSON.parse(isDark));
    } catch (e) {
    } finally {
      setThemeLoading(false);
    }
  }, []);

  useEffect(() => {
    getTheme();
  }, []);

  // set the the theme
  const setIsDark = useCallback(async value => {
    setisDark(value);
    try {
      await AsyncStorage.setItem('AppTheme', JSON.stringify(value));
    } catch (e) {}
  }, []);

  if (themeLoading) {
    return <SplashScreen />;
  }
  return (
    <ThemeContext.Provider
      value={{
        isDark,
        setIsDark,
        themeLoading,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default function useToggleTheme() {
  return useContext(ThemeContext);
}
