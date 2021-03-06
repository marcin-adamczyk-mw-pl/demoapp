import React, { useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InfoPopup } from '../components/InfoPopup';
import { RootState, toggleFavouriteShop } from '../features';
import { ShopData } from '../models';
import { PopupContext } from '../navigation/modals/PopupContext';

export const useFavouriteShops = () => {
  const dispatch = useDispatch();

  const { showPopup } = useContext(PopupContext);
  const favIds = useSelector<RootState, number[]>(
    (state) => state.favourites.shops.current,
    (a, b) => a.length === b.length,
  );

  const isFavourite = useCallback(
    (shop: ShopData) => favIds.includes(shop.id),
    [favIds],
  );

  const toggleFavourite = useCallback(
    (shop: ShopData) => {
      const isFavouriteShop = isFavourite(shop);
      dispatch(toggleFavouriteShop(shop, isFavouriteShop));
      if (!isFavouriteShop) {
        showPopup(<InfoPopup message={'Added to your favourites'} />, 1500);
      }
    },
    [dispatch, isFavourite, showPopup],
  );

  return { isFavourite, toggleFavourite };
};
