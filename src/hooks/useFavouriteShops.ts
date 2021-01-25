import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { favourites, RootState } from '../features';
import { ShopData } from '../models';

export const useFavouriteShops = () => {
  const dispatch = useDispatch();
  const favIds = useSelector<RootState, number[]>(
    (state) => state.favourites.shops,
    (a, b) => a.length === b.length,
  );

  const isFavourite = useCallback(
    (shop: ShopData) => favIds.includes(shop.id),
    [favIds],
  );

  const toggleFavourite = useCallback(
    (shop: ShopData) => {
      dispatch(favourites.actions.toggle(shop.id));
    },
    [dispatch],
  );

  return { isFavourite, toggleFavourite };
};
