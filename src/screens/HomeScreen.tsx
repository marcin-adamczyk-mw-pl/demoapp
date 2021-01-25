import React, { useCallback } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Header } from '../components/Header';
import { LatestTransactions } from '../components/LatestTransactions';
import { ShopFavouritesList } from '../components/ShopFavouritesList';

import { ScreenComponent } from '../navigation/routes';

export const HomeScreen: ScreenComponent<'Shopping'> = () => (
  <SafeAreaView style={{ flex: 1 }}>
    <View style={{ flex: 1 }}>
      <Header title={'Home'} />
      <ShopFavouritesList />
      <LatestTransactions />
    </View>
  </SafeAreaView>
);
