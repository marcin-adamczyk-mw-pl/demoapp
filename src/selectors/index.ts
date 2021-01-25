import { createSelector } from 'reselect';
import { RootState } from '../features';
import { Transaction } from '../models';

const getTransactionData = (state: RootState) => state.data.transactions;
const getShops = (state: RootState) => state.data.shops;
const getFavoritesIds = (state: RootState) => state.favourites.shops.current;

export const getAllTransactions = createSelector(
  [getTransactionData, getShops],
  (transactions, shops): Transaction[] =>
    transactions.map((transaction) => ({
      ...transaction,
      title:
        shops.find((shop) => shop.id === transaction.shopId)?.name ||
        'Untitled',
    })),
);

export const getCardTransactions = createSelector(
  [getAllTransactions, (_: any, cardId: number) => cardId],
  (transations, cardId) => transations.filter((t) => t.cardId === cardId),
);

export const getShopTransactions = createSelector(
  [getAllTransactions, (_: any, shopId: number) => shopId],
  (transations, shopId) => transations.filter((t) => t.shopId === shopId),
);

export const getFavouriteShops = createSelector(
  [getShops, getFavoritesIds],
  (shops, favourites) => shops.filter((shop) => favourites.includes(shop.id)),
);
