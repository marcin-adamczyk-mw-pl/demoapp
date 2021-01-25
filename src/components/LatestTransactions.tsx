import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../features';
import { Transaction } from '../models';
import { getAllTransactions } from '../selectors';
import { Palette } from '../theme/palette';
import { TransactionList } from './TransactionList';

export const LatestTransactions: React.FunctionComponent = () => {
  const transactions = useSelector<RootState, Transaction[]>(
    getAllTransactions,
  ).slice(0, 5);

  return (
    <View style={styles.transactions}>
      <Text style={styles.title}>Your latest transactions</Text>
      <TransactionList
        transactions={transactions}
        style={{ padding: 16, maxHeight: 350, marginTop: 8 }}
        tintColor={'white'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginHorizontal: 16,
    marginVertical: 8,
  },
  transactions: {
    marginTop: 32,
    paddingVertical: 16,
    backgroundColor: Palette.secondary,
    borderRadius: 30,
    marginHorizontal: 16,
  },
});
