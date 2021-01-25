import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import MainBottomTabsNavigation from './BottomTabNavigation';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackRoutes } from './routes';
import { PopupContainer, PopupContext } from './modals/PopupContext';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, fetchFavourites, RootState } from '../features';
import { ShopScreen } from '../screens/ShopScreen';
import { InfoPopup } from '../components/InfoPopup';

const Stack = createStackNavigator<RootStackRoutes>();

export const AppNavigator = () => {
  const dispatch = useDispatch();
  const { showPopup } = useContext(PopupContext);

  const networkError = useSelector<RootState, boolean>(
    (state) => !!state.data.error,
  );

  useEffect(() => {
    if (networkError) {
      showPopup(
        <InfoPopup
          message={'Network error, check server status'}
          style={{ backgroundColor: 'tomato' }}
        />,
        5000,
      );
    }
  }, [networkError, showPopup]);

  useEffect(() => {
    dispatch(fetchData());
    dispatch(fetchFavourites());
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
