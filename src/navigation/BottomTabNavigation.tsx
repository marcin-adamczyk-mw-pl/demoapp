import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabRoutes, ScreenComponent } from './routes';

import { Palette } from '../theme/palette';
import { HomeScreen } from '../screens/HomeScreen';
import { CardScreen } from '../screens/CardScreen';
import { ShoppingScreen } from '../screens/ShoppingScreen';
import { Icons } from '../../assets/icons';
import { Image, ImageSourcePropType } from 'react-native';

const Tab = createBottomTabNavigator<BottomTabRoutes>();

const renderIcon = (icon: ImageSourcePropType) => ({
  color: tintColor,
}: {
  color: string;
}) => <Image source={icon} style={{ tintColor, width: 24, height: 24 }} />;

const BottomTabNavigation: ScreenComponent<'BottomNavigation'> = () => (
  <Tab.Navigator
    initialRouteName="Home"
    tabBarOptions={{
      keyboardHidesTabBar: true,
      activeTintColor: Palette.accent,
      inactiveTintColor: Palette.secondary,
    }}>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{ tabBarIcon: renderIcon(Icons.home) }}
    />
    <Tab.Screen
      name="Cards"
      component={CardScreen}
      options={{ tabBarIcon: renderIcon(Icons.card) }}
    />
    <Tab.Screen
      name="Shopping"
      component={ShoppingScreen}
      options={{ tabBarIcon: renderIcon(Icons.shop) }}
    />
  </Tab.Navigator>
);

export default BottomTabNavigation;
