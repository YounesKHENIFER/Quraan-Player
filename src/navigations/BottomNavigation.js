import React, {useCallback, useEffect, useState} from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {useTheme} from '@react-navigation/native';
import {Heart, Heart2, InfoCircle} from 'react-native-iconly';

import StackNavigator from './StackNavigator';
import {Dimensions, StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import NetInfo from '@react-native-community/netinfo';

import InfosScreen from '../screens/InfosScreen';
import DownloadsScreen from '../screens/DownloadsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
const Tab = createBottomTabNavigator();

export default function BottomTabs({navigation, route}) {
  const {colors} = useTheme();
  const indicator = useSharedValue(0);

  const listeners = useCallback(
    index => ({
      focus: () => {
        // indicator.value = withSpring(-WIDTH * index, {mass: 0.7});
        indicator.value = withTiming(-WIDTH * index);
      },
    }),
    [],
  );

  const [connected, setConnected] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
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

  // if loading display splash screen
  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Tab.Navigator
      detachInactiveScreens={true}
      initialRouteName="Main"
      screenOptions={() => ({
        headerShown: false,
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          backgroundColor: colors.primary,
        },
        headerTitleStyle: {
          fontSize: 18,
          fontFamily: 'Tajawal-Bold',
          color: '#fff',
        },
        headerTintColor: '#fff',
        tabBarLabelStyle: {
          fontFamily: 'Tajawal-Bold',
          fontSize: 10,
          marginTop: 0,
        },
        headerTitleAlign: 'center',
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.primaryText,
        tabBarInactiveTintColor: colors.gray,
      })}
      tabBar={props => <CustomTabBar {...props} indicator={indicator} />}>
      <Tab.Screen
        name="Infos"
        component={InfosScreen}
        options={{
          tabBarLabel: 'معلومات',
          title: 'معلومات عن التطبيق',
          headerShown: true,
          tabBarIcon: ({focused, color, size}) => {
            return focused ? (
              <InfoCircle set="bold" size={size} primaryColor={color} />
            ) : (
              <InfoCircle set="light" size={size} primaryColor={color} />
            );
          },
        }}
        listeners={() => listeners(0)}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          headerShown: true,
          title: 'قائمة المفضلة',
          tabBarLabel: 'المفضلة',
          tabBarIcon: ({focused, color, size}) => {
            return focused ? (
              <Heart2 set="bold" size={size} primaryColor={color} />
            ) : (
              <Heart set="curved" size={size} primaryColor={color} />
            );
          },
        }}
        listeners={() => listeners(1)}
      />
      <Tab.Screen
        name="Downloads"
        component={DownloadsScreen}
        options={{
          tabBarLabel: 'التحميلات',
          title: 'قائمة التحميلات',
          headerShown: true,
          tabBarIcon: ({focused, color, size}) => {
            return focused ? (
              <Ionicons name="cloud-download" size={size} color={color} />
            ) : (
              <Ionicons
                name="cloud-download-outline"
                size={size}
                color={color}
              />
            );
          },
        }}
        listeners={() => listeners(2)}
      />

      <Tab.Screen
        name="Main"
        options={{
          tabBarLabel: 'الإستماع',
          tabBarIcon: ({focused, color, size}) => {
            return focused ? (
              <Ionicons name="headset" size={size} color={color} />
            ) : (
              <Ionicons name="headset-outline" size={size} color={color} />
            );
          },
        }}
        listeners={() => listeners(3)}>
        {() => <StackNavigator connected={connected} setRefresh={setRefresh} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

function CustomTabBar(props) {
  const {
    colors: {primaryText, background},
  } = useTheme();

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: props.indicator.value}],
    };
  });
  return (
    <View style={{backgroundColor: background}}>
      <Animated.View style={[rStyle, styles.indicator(primaryText)]} />
      <BottomTabBar {...props} />
    </View>
  );
}

const WIDTH = Dimensions.get('window').width / 4;
const INDICATOR_WIDTH = WIDTH - WIDTH / 2;

const styles = StyleSheet.create({
  indicator: backgroundColor => ({
    height: 4,
    width: INDICATOR_WIDTH,
    backgroundColor,
    position: 'absolute',
    top: 0,
    left: (WIDTH - INDICATOR_WIDTH) / 2, //divide by 2 for indicator left and right (centering indicator)
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  }),
  tabBar: {
    height: 60,
    elevation: 0,
    shadowOpacity: 0,
    borderTopWidth: 0.5,
    paddingBottom: 5,
    paddingTop: 5,
    backgroundColor: 'transparent',
  },
});
