import React, {useCallback, useEffect} from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {useTheme} from '@react-navigation/native';
import {Home, Notification, User} from 'react-native-iconly';

import StackNavigator from './StackNavigator';
import {Dimensions, StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
const Tab = createBottomTabNavigator();

export default function BottomTabs({navigation, route}) {
  const {colors} = useTheme();
  const indicator = useSharedValue(0);

  const listeners = useCallback(
    index => ({
      focus: () => {
        indicator.value = withSpring(WIDTH * index, {mass: 0.7});
        // indicator.value = withTiming(WIDTH * index);
      },
    }),
    [],
  );
  return (
    <Tab.Navigator
      detachInactiveScreens={true}
      initialRouteName="Player"
      screenOptions={() => ({
        headerShown: false,
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          backgroundColor: colors.background,
        },
        headerTitleAlign: 'center',
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray,
      })}
      tabBar={props => <CustomTabBar {...props} indicator={indicator} />}>
      <Tab.Screen
        name="Home"
        component={StackNavigator}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return focused ? (
              <Home set="bold" size={size} primaryColor={color} />
            ) : (
              <Home set="light" size={size} primaryColor={color} />
            );
          },
        }}
        listeners={() => listeners(0)}
      />
      <Tab.Screen
        name="Search"
        component={StackNavigator}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return focused ? (
              <Ionicons name="search" size={size} color={color} />
            ) : (
              <Ionicons name="search-outline" size={size} color={color} />
            );
          },
        }}
        listeners={() => listeners(1)}
      />
      <Tab.Screen
        name="Notifications"
        component={StackNavigator}
        options={{
          headerShown: true,
          tabBarIcon: ({focused, color, size}) => {
            return focused ? (
              <Notification set="bold" size={size} primaryColor={color} />
            ) : (
              <Notification set="light" size={size} primaryColor={color} />
            );
          },
        }}
        listeners={() => listeners(2)}
      />
      <Tab.Screen
        name="Profile"
        component={StackNavigator}
        options={{
          lazy: true,
          tabBarIcon: ({focused, color, size}) => {
            return focused ? (
              <User set="bold" size={size} primaryColor={color} />
            ) : (
              <User set="light" size={size} primaryColor={color} />
            );
          },
        }}
        listeners={() => listeners(3)}
      />
    </Tab.Navigator>
  );
}

function CustomTabBar(props) {
  const {
    colors: {primary},
  } = useTheme();

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: props.indicator.value}],
    };
  });
  return (
    <View>
      <Animated.View style={[rStyle, styles.indicator(primary)]} />
      <BottomTabBar {...props} />
    </View>
  );
}

const WIDTH = Dimensions.get('window').width / 4;
const INDICATOR_WIDTH = WIDTH - WIDTH / 2;
function getSwiper(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

  return routeName === 'Home' ? true : false;
}

const styles = StyleSheet.create({
  indicator: backgroundColor => ({
    height: 5,
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
    backgroundColor: 'transparent',
  },
});
