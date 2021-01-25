import React from 'react';
import { StackNavigationOptions } from '@react-navigation/stack';
import { Palette } from '../theme/palette';

export const defaultNavOptions: StackNavigationOptions = {
  headerTitleAlign: 'center',
  headerBackTitleVisible: false,
  headerTintColor: Palette.primary,
};
