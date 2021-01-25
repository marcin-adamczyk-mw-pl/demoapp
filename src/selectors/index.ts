import { createSelector } from 'reselect';
import { RootState } from '../features';

const getCards = (state: RootState) => state.data.cards;
const getTransactions = (state: RootState) => state.data.transactions;
const getShops = (state: RootState) => state.data.shops;

export const getCardTransactions = createSelector(
  [getTransactions, getShops, (_: any, cardId: number) => cardId],
  (transations, shops, cardId) => {
    const cardTransactions = transations.filter((t) => t.cardId === cardId);
    return cardTransactions.map((transaction) => ({
      ...transaction,
      title: shops.find((shop) => shop.id === transaction.shopId)?.name,
    }));
  },
);
