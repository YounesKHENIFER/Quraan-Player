import React, {useEffect, useState} from 'react';
import {StatusBar, I18nManager} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import PlayerScreen from './screens/PlayerScreen';
import ReciterScreen from './screens/ReciterScreen';
import FavoriteScreen from './screens/FavoritesScreen';
import InfosScreen from './screens/InfosScreen';
import OfflineScreen from './components/OfflineScreen';
import SplashScreen from './components/SplashScreen';

import NetInfo from '@react-native-community/netinfo';
import fonts from './style/fonts';
import colors from './style/colors';

const Stack = createNativeStackNavigator();

try {
  I18nManager.allowRTL(true);
  I18nManager.forceRTL(true);
} catch (e) {
  console.log(e);
}

export default function App() {
  const [connected, setConnected] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  // Subscribe

  useEffect(() => {
    const unsub = NetInfo.addEventListener(state => {
      setConnected(state.isConnected && state.isInternetReachable);
      setLoading(false);
    });
    return () => {
      unsub();
    };
  }, [refresh]);

  if (loading) {
    return <SplashScreen />;
  }
  if (!connected) {
    return <OfflineScreen setRefresh={setRefresh} />;
  }
  return (
    <>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            animation: 'slide_from_left',
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: colors.primary,
            },
            headerTitleStyle: {
              fontSize: 18,
              fontFamily: fonts.bold,
              color: '#fff',
            },
          }}
          initialRouteName="Home">
          <Stack.Screen
            options={{
              title: 'قارئ القرآن',
            }}
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen name="Reciter" component={ReciterScreen} />
          <Stack.Screen
            name="Player"
            options={{
              title: '',
            }}
            component={PlayerScreen}
          />
          <Stack.Screen
            options={{
              title: 'قائمة المفضلة',
            }}
            name="Favorite"
            component={FavoriteScreen}
          />
          <Stack.Screen
            options={{
              title: 'معلومات عن التطبيق',
            }}
            name="Infos"
            component={InfosScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
