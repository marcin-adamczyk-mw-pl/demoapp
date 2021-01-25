import React, { useCallback, useEffect, useState } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { useTimingTransition } from 'react-native-redash/lib/module/v1';
import { Transaction } from '../models';
import { Palette } from '../theme/palette';

type Props = {
  transactions: Transaction[];
  style?: StyleProp<ViewStyle>;
  tintColor?: string;
};

const TransactionItem: React.FunctionComponent<{
  item: Transaction;
  index: number;
  tintColor?: string;
}> = ({ item, index, tintColor }) => {
  const [visible, setVisible] = useState(false);
  const opacity = useTimingTransition(visible, { duration: 500 });

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 100 * index);
    return () => clearTimeout(timeout);
  }, [index]);
  return (
    <Animated.View style={[styles.item, { opacity }]}>
      <View
        style={{
          justifyContent: 'space-between',
          flex: 1,
        }}>
        <Text style={[styles.title, { color: tintColor }]}>{item.title}</Text>
        <Text style={[styles.date, { color: tintColor }]}>
          {new Date(item.timestamp).toLocaleString()}
        </Text>
      </View>
      <Text style={[styles.price, { color: tintColor }]}>-{item.amount}</Text>
    </Animated.View>
  );
};

export const TransactionList: React.FunctionComponent<Props> = ({
  transactions,
  style,
  tintColor,
}) => {
  const renderItem = useCallback(
    ({ item, index }: { item: Transaction; index: number }) => (
      <TransactionItem item={item} index={index} tintColor={tintColor} />
    ),
    [tintColor],
  );

  const renderPlaceholder = useCallback(
    () => (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.placeholder}>Nothing here yet :(</Text>
      </View>
    ),
    [],
  );

  const keyExtractor = useCallback(
    (item: Transaction) => item.id.toString(),
    [],
  );

  return (
    <FlatList
      style={style}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        !transactions.length && {
          justifyContent: 'center',
          flex: 1,
        },
      ]}
      data={transactions}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ListEmptyComponent={renderPlaceholder}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    backgroundColor: 'rgba(104, 207,131,0.2)',
    borderRadius: 12,
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 6,
  },
  price: {
    fontWeight: '600',
  },
  date: {
    fontSize: 12,
    fontWeight: '300',
  },
  placeholder: {
    fontSize: 16,
    color: Palette.accent,
    fontWeight: '300',
  },
});
