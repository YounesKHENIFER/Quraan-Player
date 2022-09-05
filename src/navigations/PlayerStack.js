import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import PlayerScreen from '../screens/PlayerScreen';
import ReciterScreen from '../screens/ReciterScreen';

import fonts from '../style/fonts';
import OfflineScreen from '../components/OfflineScreen';
import {useTheme} from '@react-navigation/native';

const Stack = createStackNavigator();

const PlayerStack = ({connected, setRefresh}) => {
  const {colors} = useTheme();

  return (
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
        name="Home">
        {props =>
          connected ? (
            <HomeScreen {...props} />
          ) : (
            <OfflineScreen {...props} setRefresh={setRefresh} />
          )
        }
      </Stack.Screen>
      <Stack.Screen
        options={{
          headerBackVisible: true,
        }}
        name="Reciter">
        {props =>
          connected ? (
            <ReciterScreen {...props} />
          ) : (
            <OfflineScreen setRefresh={setRefresh} {...props} />
          )
        }
      </Stack.Screen>
      <Stack.Screen
        name="Player"
        options={{
          headerBackVisible: true,
          title: '',
        }}
        component={PlayerScreen}
      />
    </Stack.Navigator>
  );
};

export default PlayerStack;
