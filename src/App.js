import React, {useEffect, useState} from 'react';
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

const Stack = createNativeStackNavigator();

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

  if (loading) return <SplashScreen />;
  if (!connected) return <OfflineScreen setRefresh={setRefresh} />;
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          animation: 'fade',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#eee',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 23,
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
  );
}
