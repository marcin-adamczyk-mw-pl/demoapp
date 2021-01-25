import { HeaderBackButton } from '@react-navigation/stack';
import React from 'react';
import { Dimensions, StyleSheet, Text } from 'react-native';
import { SafeAreaView, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Header } from '../components/Header';
import { ShopItem } from '../components/ShopItem';
import { TransactionList } from '../components/TransactionList';
import { RootState } from '../features';
import { useFavouriteShops } from '../hooks';
import { Transaction } from '../models';

import { ScreenComponent } from '../navigation/routes';
import { getShopTransactions } from '../selectors';
import { Palette } from '../theme/palette';

export const ShopScreen: ScreenComponent<'ShopScreen'> = ({
  navigation: { goBack },
  route: {
    params: { shop },
  },
}) => {
  const transactions = useSelector<RootState, Transaction[]>((state) =>
    getShopTransactions(state, shop.id),
  );
  const favoriteCallbacks = useFavouriteShops();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <HeaderBackButton
            onPress={goBack}
            labelVisible={false}
            tintColor={Palette.accent}
            style={{ height: 40 }}
          />
          <Header title={shop.name} style={{ marginTop: 12, marginLeft: -8 }} />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <ShopItem
            {...favoriteCallbacks}
            item={shop}
            style={{
              width: Dimensions.get('window').width - 32,
              height: 200,
              margin: 16,
            }}
          />
        </View>
        <View style={styles.transactions}>
          <Text style={styles.title}>Latest transactions in {shop.name}</Text>
          <TransactionList
            transactions={transactions}
            style={{ padding: 16, maxHeight: 350, marginTop: 8 }}
            tintColor={'white'}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginHorizontal: 16,
    marginVertical: 8,
  },
  transactions: {
    marginTop: 24,
    paddingVertical: 16,
    backgroundColor: Palette.secondary,
    borderRadius: 30,
    marginHorizontal: 16,
  },
});
