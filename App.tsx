import { transform } from '@babel/core';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Dimensions,
} from 'react-native';

import Animated, {
  useValue,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { onScrollEvent } from 'react-native-redash/lib/module/v1';
import { Card } from './src/components/Card';

declare const global: { HermesInternal: null | {} };

const App = () => {
  const scrollOffset = useValue(0);

  const windowWidth = Dimensions.get('window').width;
  const cardWidth = windowWidth * 0.75;
  const cardHeight = cardWidth * 0.6;
  const cardMargin = (windowWidth - cardWidth) / 2;
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Animated.ScrollView
          horizontal
          snapToInterval={cardWidth}
          scrollEventThrottle={1}
          contentContainerStyle={{ paddingHorizontal: cardMargin }}
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 24 }}
          onScroll={onScrollEvent({ x: scrollOffset })}>
          {new Array(5).fill(0).map((_, i) => {
            const cardOffset = i * cardWidth;
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
                key={i}
                visibility={visibility}
                style={{ width: cardWidth, height: cardHeight }}
              />
            );
          })}
        </Animated.ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 300,
    height: 180,
    borderRadius: 15,
    backgroundColor: 'tomato',
  },
});

export default App;
