import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { xor } from 'lodash';

export type Favourites = {
  shops: number[];
};

const initialState: Favourites = {
  shops: [],
};

export const favourites = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    toggle: (state, { payload: storeId }: PayloadAction<number>) => {
      state.shops = xor(state.shops, [storeId]);
    },
  },
});
