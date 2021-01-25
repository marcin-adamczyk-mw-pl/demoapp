import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import MainBottomTabsNavigation from './BottomTabNavigation';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackRoutes } from './routes';
import { PopupContainer } from './modals/PopupContext';
import { useDispatch } from 'react-redux';
import { fetchData } from '../features';
import { ShopScreen } from '../screens/ShopScreen';

const Stack = createStackNavigator<RootStackRoutes>();

export const AppNavigator = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode="screen"
        initialRouteName={'BottomNavigation'}>
        <Stack.Screen
          name="BottomNavigation"
          component={MainBottomTabsNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ShopScreen"
          component={ShopScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <PopupContainer />
    </NavigationContainer>
  );
};
