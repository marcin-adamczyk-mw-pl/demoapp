import React, { useCallback } from 'react';
import {
  StyleProp,
  ViewStyle,
  View,
  Image,
  StyleSheet,
  Text,
  TextStyle,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ShopData } from '../models';
import { FavoriteToggle } from './FavouriteToggle';

type Props = {
  item: ShopData;
  onPress?: (item: ShopData) => void;
  style: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  isFavourite: (item: ShopData) => boolean;
  toggleFavourite: (item: ShopData) => void;
};
export const ShopItem: React.FunctionComponent<Props> = ({
  item,
  style,
  textStyle,
  toggleFavourite,
  isFavourite,
  onPress,
}) => {
  const onItemPress = useCallback(() => onPress && onPress(item), [
    item,
    onPress,
  ]);

  const onFavToggle = useCallback(() => {
    toggleFavourite(item);
  }, [item, toggleFavourite]);
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onItemPress}
      disabled={!onPress}>
      <Image
        source={{ uri: item.cover }}
        style={[StyleSheet.absoluteFill, { borderRadius: 20, opacity: 0.6 }]}
      />
      <FavoriteToggle
        style={{ alignSelf: 'flex-end' }}
        isFavorite={isFavourite(item)}
        toggle={onFavToggle}
      />
      <Text numberOfLines={1} style={[styles.name, textStyle]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    borderRadius: 20,
    padding: 16,
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  name: {
    color: 'white',
    fontSize: 22,
    fontWeight: '600',
  },
});
