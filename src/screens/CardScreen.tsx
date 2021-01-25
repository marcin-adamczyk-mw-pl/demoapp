import React, { useCallback, useState } from 'react';
import {
  SafeAreaView,
  Dimensions,
  Text,
  StyleSheet,
  View,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

import Animated, {
  useValue,
  interpolate,
  multiply,
  divide,
  modulo,
} from 'react-native-reanimated';
import { onScrollEvent } from 'react-native-redash/lib/module/v1';
import { useSelector } from 'react-redux';
import { Card } from '../components/Card';
import { Header } from '../components/Header';
import { TransactionList } from '../components/TransactionList';
import { RootState } from '../features';
import { CardData, Transaction } from '../models';
import { ScreenComponent } from '../navigation/routes';
import { getCardTransactions } from '../selectors';
import { Palette } from '../theme/palette';

export const CardScreen: ScreenComponent<'Cards'> = () => {
  const cards = useSelector<RootState, CardData[]>((store) => store.data.cards);
  const [selectedCard, setSelectedCard] = useState(cards[0]);

  const transactions = useSelector<RootState, Transaction[]>((state) =>
    getCardTransactions(state, selectedCard?.id),
  );
  const scrollOffset = useValue(0);
  const windowWidth = Dimensions.get('window').width;
  const indicatorAreaWidth = 100;
  const cardWidth = windowWidth * 0.75;
  const cardHeight = cardWidth * 0.6;
  const cardMargin = (windowWidth - cardWidth) / 2;
  const contentWidth = cards.length * cardWidth + 2 * cardMargin;
  const scrollPhase = modulo(scrollOffset, cardWidth);
  const indicatorScaleX = interpolate(scrollPhase, {
    inputRange: [
      0,
      cardWidth * 0.25,
      cardWidth / 2,
      cardWidth * 0.75,
      cardWidth,
    ],
    outputRange: [1, 0.8, 0.6, 0.8, 1],
  });
  const indicatorOffset = multiply(
    indicatorAreaWidth,
    divide(scrollOffset, contentWidth),
  );
  const onSnap = useCallback(
    ({
      nativeEvent: { contentOffset },
    }: NativeSyntheticEvent<NativeScrollEvent>) => {
      const selectedIndex = Math.ceil(contentOffset.x / cardWidth);
      setSelectedCard(cards[selectedIndex]);
    },
    [cardWidth, cards],
  );

  if (!cards.length) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View>
          <Header title={'Your cards'} />
          <Animated.ScrollView
            horizontal
            decelerationRate={'fast'}
            snapToInterval={cardWidth}
            scrollEventThrottle={1}
            onMomentumScrollEnd={onSnap}
            contentContainerStyle={{ paddingHorizontal: cardMargin }}
            showsHorizontalScrollIndicator={false}
            style={{ marginVertical: 16 }}
            onScroll={onScrollEvent({ x: scrollOffset })}>
            {cards.map((data, index) => {
              const cardOffset = index * cardWidth;
              const visibility = interpolate(scrollOffset, {
                inputRange: [
                  cardOffset - cardWidth,
                  cardOffset - cardWidth / 3,
                  cardOffset + cardWidth / 3,
                  cardOffset + cardWidth,
                ],
                outputRange: [0, 1, 1, 0],
              });

              return (
                <Card
                  details={data}
                  key={data.id}
                  visibility={visibility}
                  style={{ width: cardWidth, height: cardHeight }}
                />
              );
            })}
          </Animated.ScrollView>
          <View
            style={[styles.indicatorContainer, { width: indicatorAreaWidth }]}>
            {new Array(cards.length + 1).fill(0).map((_, i) => (
              <View key={i} style={styles.indicator} />
            ))}
            <Animated.View
              style={[
                styles.activeIndicator,
                {
                  width: indicatorAreaWidth / cards.length + 6,
                  transform: [
                    { translateX: indicatorOffset },
                    { scaleX: indicatorScaleX },
                  ],
                },
              ]}>
              <View style={StyleSheet.absoluteFill} />
            </Animated.View>
          </View>
        </View>
        <View style={styles.transactions}>
          <Text style={styles.transactionHeader}>Transactions</Text>
          <TransactionList transactions={transactions} style={{ flex: 1 }} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  indicatorContainer: {
    marginTop: 16,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Palette.primary,
    opacity: 0.7,
  },
  activeIndicator: {
    height: 6,
    borderRadius: 10,
    backgroundColor: Palette.secondary,
    position: 'absolute',
    overflow: 'hidden',
    left: 0,
  },
  transactions: {
    backgroundColor: 'white',
    flexGrow: 1,
    marginTop: 32,
    padding: 16,
    shadowOpacity: 0.2,
    shadowColor: Palette.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  transactionHeader: {
    fontSize: 18,
    fontWeight: '300',
    color: Palette.secondary,
    marginBottom: 12,
  },
});
