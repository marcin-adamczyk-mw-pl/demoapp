import { RootState } from '../src/features';
import { ShopData, TransactionData } from '../src/models';
import {
  getAllTransactions,
  getCardTransactions,
  getFavouriteShops,
  getShopTransactions,
} from '../src/selectors/index';

describe('selectors', () => {
  const transaction: TransactionData = {
    id: 8,
    timestamp: 1611575824000,
    shopId: 5,
    amount: 4.98,
    cardId: 1,
  };
  const shop: ShopData = {
    id: 5,
    name: 'SuperFoods',
    cover: 'bg.jpg',
  };
  const state: Partial<RootState> = {
    data: {
      cards: [],
      transactions: [transaction],
      shops: [shop],
    },
    favourites: {
      shops: {
        current: [shop.id],
        previous: [],
      },
    },
  };

  test('should merge shop info into transaction', () => {
    expect(getAllTransactions(state as RootState)).toEqual([
      { ...transaction, title: shop.name },
    ]);
  });

  test('should use default value for transaction name', () => {
    expect(
      getAllTransactions({
        ...state,
        data: { ...state.data, shops: [] },
      } as RootState),
    ).toEqual([{ ...transaction, title: 'Untitled' }]);
  });

  test('should get transactions matching card id', () => {
    const transactions = [transaction, { ...transaction, cardId: 100 }];
    expect(
      getCardTransactions(
        { ...state, data: { ...state.data, transactions } } as RootState,
        transaction.cardId,
      ),
    ).toEqual([{ ...transaction, title: shop.name }]);
  });

  test('should get transactions matching store id', () => {
    const transactions = [transaction, { ...transaction, shopId: 100 }];
    expect(
      getShopTransactions(
        { ...state, data: { ...state.data, transactions } } as RootState,
        transaction.shopId,
      ),
    ).toEqual([{ ...transaction, title: shop.name }]);
  });

  test('should get favourite shops', () => {
    const shops = [shop, { ...shop, id: 1 }];
    expect(
      getFavouriteShops({
        ...state,
        data: { ...state.data, shops },
      } as RootState),
    ).toEqual([shop]);
  });
});
