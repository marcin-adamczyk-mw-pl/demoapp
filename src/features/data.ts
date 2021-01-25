import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BASE_URL } from '../api';
import { CardData, ShopData, Transaction } from '../models';
import { Thunk } from './store';

export type Data = {
  cards: CardData[];
  shops: ShopData[];
  transactions: Transaction[];
};

const initialState: Data = {
  cards: [],
  shops: [],
  transactions: [],
};

export const data = createSlice({
  name: 'data',
  initialState,
  reducers: {
    updateData: (_, { payload }: PayloadAction<Data>) => payload,
  },
});

export const fetchData = (): Thunk => async (dispatch) => {
  try {
    const [cards, shops, transactions] = await Promise.all(
      (
        await Promise.all([
          fetch(`${BASE_URL}/cards`),
          fetch(`${BASE_URL}/shops`),
          fetch(`${BASE_URL}/transactions`),
        ])
      ).map((r) => r.json()),
    );
    dispatch(data.actions.updateData({ cards, shops, transactions }));
  } catch (e) {
    // TODO handle network error
  }
};
