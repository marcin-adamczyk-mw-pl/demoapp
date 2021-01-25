import React, { useCallback } from 'react';
import { SafeAreaView, Dimensions, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { Header } from '../components/Header';
import { ShopItem } from '../components/ShopItem';
import { RootState } from '../features';
import { useFavouriteShops } from '../hooks';
import { ShopData } from '../models';
import { ScreenComponent } from '../navigation/routes';

export const ShoppingScreen: ScreenComponent<'Shopping'> = ({
  navigation: { navigate },
}) => {
  const shops = useSelector<RootState, ShopData[]>((store) => store.data.shops);

  const favoriteCallbacks = useFavouriteShops();
  const window = Dimensions.get('window');
  const numColumns = 2;
  const itemMargin = 6;
  const itemWidth = window.width / numColumns - 3 * itemMargin;

  const goToShop = useCallback(
    (shop: ShopData) => navigate('ShopScreen', { shop }),
    [navigate],
  );

  const renderItem = useCallback(
    ({ item }: { item: ShopData }) => (
      <ShopItem
        {...favoriteCallbacks}
        onPress={goToShop}
        item={item}
        style={{ width: itemWidth, height: itemWidth, margin: itemMargin }}
      />
    ),
    [favoriteCallbacks, goToShop, itemWidth],
  );
  const keyExtractor = useCallback((item: ShopData) => item.id.toString(), []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Header title={'Discover shops'} />
        <FlatList
          data={shops}
          style={{ padding: itemMargin }}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          numColumns={numColumns}
        />
      </View>
    </SafeAreaView>
  );
};
