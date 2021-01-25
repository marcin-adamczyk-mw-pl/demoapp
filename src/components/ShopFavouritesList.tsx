import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { RootState } from '../features';
import { useFavouriteShops } from '../hooks';
import { ShopData } from '../models';
import { getFavouriteShops } from '../selectors';
import { Palette } from '../theme/palette';
import { ShopItem } from './ShopItem';

export const ShopFavouritesList: React.FunctionComponent = () => {
  const shops = useSelector<RootState, ShopData[]>(getFavouriteShops);

  const { navigate } = useNavigation();

  const goToShop = useCallback(
    (shop: ShopData) => navigate('ShopScreen', { shop }),
    [navigate],
  );
  const goToShoppingScreen = useCallback(() => navigate('Shopping'), [
    navigate,
  ]);

  const favoriteCallbacks = useFavouriteShops();
  const window = Dimensions.get('window');
  const itemMargin = 6;
  const itemWidth = window.width / 4;

  const renderItem = useCallback(
    ({ item }: { item: ShopData }) => (
      <ShopItem
        {...favoriteCallbacks}
        item={item}
        onPress={goToShop}
        textStyle={[itemWidth < 200 && { fontSize: 14 }]}
        style={{ width: itemWidth, height: itemWidth, margin: itemMargin }}
      />
    ),
    [favoriteCallbacks, goToShop, itemWidth],
  );
  const keyExtractor = useCallback((item: ShopData) => item.id.toString(), []);

  if (!shops.length) {
    return (
      <TouchableOpacity onPress={goToShoppingScreen}>
        <View
          style={{
            margin: 16,
            padding: 16,
            backgroundColor: Palette.accent,
            borderRadius: 20,
          }}>
          <Text style={styles.title}>Discover shops & add to favourites</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={{
        paddingVertical: 16,
        alignItems: 'flex-start',
        backgroundColor: Palette.accent,
        borderRadius: 30,
        marginHorizontal: 16,
      }}>
      <Text style={styles.title}>Your favourite shops</Text>
      <FlatList
        fadingEdgeLength={50}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={shops}
        contentContainerStyle={{ paddingHorizontal: 8 }}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
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
});
