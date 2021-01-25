export type CardData = {
  id: number;
  number: string;
  cvv: string;
  expires: string;
};

export type ShopData = {
  id: number;
  name: string;
  cover: string;
};

export type TransactionData = {
  id: number;
  cardId: number;
  timestamp: number;
  shopId: number;
  amount: number;
};

export type Transaction = TransactionData & {
  title: string;
};
