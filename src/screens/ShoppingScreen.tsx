import React, { useCallback } from 'react';
import {
  SafeAreaView,
  Dimensions,
  Text,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { FavoriteToggle } from '../components/Like';
import { RootState } from '../features';
import { useFavouriteShops } from '../hooks';
import { ShopData } from '../models';
import { ScreenComponent } from '../navigation/routes';
import { Palette } from '../theme/palette';

export const ShoppingScreen: ScreenComponent<'Shopping'> = () => {
  const shops = useSelector<RootState, ShopData[]>((store) => store.data.shops);

  const { isFavourite, toggleFavourite } = useFavouriteShops();
  const window = Dimensions.get('window');
  const numColumns = 2;
  const itemMargin = 6;
  const itemWidth = window.width / 2 - 3 * itemMargin;
  const renderItem = useCallback(
    ({ item }: { item: ShopData }) => (
      <View
        style={{
          width: itemWidth,
          height: itemWidth,
          margin: itemMargin,
          backgroundColor: 'black',
          borderRadius: 20,
          padding: 16,
          overflow: 'hidden',
          justifyContent: 'space-between',
        }}>
        <Image
          source={{ uri: item.cover }}
          style={[StyleSheet.absoluteFill, { borderRadius: 20, opacity: 0.6 }]}
        />
        <FavoriteToggle
          style={{ alignSelf: 'flex-end' }}
          isFavorite={isFavourite(item)}
          toggle={() => toggleFavourite(item)}
        />
        <Text style={styles.name}>{item.name}</Text>
      </View>
    ),
    [isFavourite, toggleFavourite, itemWidth],
  );
  const keyExtractor = useCallback((item: ShopData) => item.id.toString(), []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text style={styles.header}>Discover shops</Text>
        <View>
          <FlatList
            data={shops}
            style={{ padding: itemMargin }}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            numColumns={numColumns}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    margin: 16,
    marginTop: 32,
    color: Palette.accent,
  },
  indicatorContainer: {
    marginTop: 16,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  name: {
    color: 'white',
    fontSize: 22,
    fontWeight: '600',
  },
});
