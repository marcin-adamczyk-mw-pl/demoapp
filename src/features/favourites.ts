import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { xor } from 'lodash';
import { Thunk } from '.';
import { BASE_URL } from '../api';
import { ShopData } from '../models';

export type Favourites = {
  shops: {
    current: number[];
    previous: number[];
  };
};
const initialState: Favourites = {
  shops: {
    current: [],
    previous: [],
  },
};

export const favourites = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    update: (state, { payload }: PayloadAction<number[]>) => {
      state.shops.current = payload;
    },
    toggle: (state, { payload: shopId }: PayloadAction<number>) => {
      state.shops.previous = state.shops.current;
      state.shops.current = xor(state.shops.current, [shopId]);
    },
    onToggleRemotelyFailed: (state) => {
      state.shops.current = state.shops.previous;
      state.shops.previous = [];
    },
  },
});

export const fetchFavourites = (): Thunk => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/favourites`);
    const data = await response.json();
    console.log(
      'data',
      data,
      data.map((d: any) => d.id),
    );
    dispatch(favourites.actions.update(data.map((d: any) => d.id)));
  } catch (e) {
    // TODO handle network error
  }
};

export const toggleFavouriteShop = (
  shop: ShopData,
  isFavourite: boolean,
): Thunk => async (dispatch) => {
  dispatch(favourites.actions.toggle(shop.id));
  try {
    if (isFavourite) {
      await fetch(`${BASE_URL}/favourites/${shop.id}`, { method: 'DELETE' });
    } else {
      await fetch(`${BASE_URL}/favourites`, {
        method: 'POST',
        body: JSON.stringify({ id: shop.id }),
      });
    }
  } catch (e) {
    dispatch(favourites.actions.onToggleRemotelyFailed());
  }
};
