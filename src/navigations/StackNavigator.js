import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import PlayerScreen from '../screens/PlayerScreen';
import ReciterScreen from '../screens/ReciterScreen';
import FavoriteScreen from '../screens/FavoritesScreen';
import InfosScreen from '../screens/InfosScreen';

import fonts from '../style/fonts';
import {MyLightTheme, MyDarkTheme} from '../style/themes';
import useToggleTheme from '../style/useToggleTheme';

const Stack = createStackNavigator();

const StackNavigator = () => {
  const {isDark} = useToggleTheme();
  const colors = isDark ? MyDarkTheme.colors : MyLightTheme.colors;

  return (
    <NavigationContainer theme={isDark ? MyDarkTheme : MyLightTheme}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <Stack.Navigator
        screenOptions={{
          animation: 'fade_from_bottom',
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
          headerTintColor: '#fff',
          ...TransitionPresets.SlideFromRightIOS,
        }}
        initialRouteName="Home">
        <Stack.Screen
          options={{
            title: 'قارئ القرآن',
          }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{
            headerBackVisible: true,
          }}
          name="Reciter"
          component={ReciterScreen}
        />
        <Stack.Screen
          name="Player"
          options={{
            headerBackVisible: true,
            title: '',
          }}
          component={PlayerScreen}
        />
        <Stack.Screen
          options={{
            headerBackVisible: true,
            title: 'قائمة المفضلة',
          }}
          name="Favorite"
          component={FavoriteScreen}
        />
        <Stack.Screen
          options={{
            headerBackVisible: true,
            title: 'معلومات عن التطبيق',
          }}
          name="Infos"
          component={InfosScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
