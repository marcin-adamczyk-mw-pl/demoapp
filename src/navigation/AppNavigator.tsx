import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import MainBottomTabsNavigation from './BottomTabNavigation';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackRoutes } from './routes';
import { defaultNavOptions } from './defaultNavOptions';
import { ModalContainer } from './modals/ModalContext';
import { useDispatch } from 'react-redux';
import { fetchData } from '../features';

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
        screenOptions={defaultNavOptions}
        initialRouteName={'BottomNavigation'}>
        <Stack.Screen
          name="BottomNavigation"
          component={MainBottomTabsNavigation}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <ModalContainer />
    </NavigationContainer>
  );
};
