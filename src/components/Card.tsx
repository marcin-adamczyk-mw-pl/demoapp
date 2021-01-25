import React, { useCallback, useState } from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { interpolate, Easing } from 'react-native-reanimated';
import { useTimingTransition } from 'react-native-redash/lib/module/v1';
import { Icons } from '../../assets/icons';
import { CardData } from '../models';
import { Palette } from '../theme/palette';

export const Card: React.FunctionComponent<{
  details: CardData;
  style?: StyleProp<Animated.AnimateStyle<ViewStyle>>;
  visibility: Animated.Node<number>;
}> = ({ details: { expires, number, cvv }, style, visibility }) => {
  const [flipped, setFlipped] = useState(false);

  const flipSide = useCallback(() => setFlipped(!flipped), [flipped]);

  const opacity = interpolate(visibility, {
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  const scale = interpolate(visibility, {
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  const scaleX = interpolate(
    useTimingTransition(!flipped, {
      duration: 200,
      easing: Easing.elastic(0.5),
    }),
    {
      inputRange: [0, 1],
      outputRange: [-1, 1],
    },
  );

  const renderFront = useCallback(
    () => (
      <View style={styles.content}>
        <Image source={Icons.logo} />
        <View>
          <View>
            <Text style={styles.details}>{number}</Text>
            <Text style={[styles.details, { fontSize: 12, marginTop: 12 }]}>
              Expires: {expires}
            </Text>
          </View>
          <View style={styles.mc}>
            <View style={[styles.circle, { backgroundColor: 'orange' }]} />
            <View
              style={[
                styles.circle,
                { backgroundColor: 'red', marginRight: -12 },
              ]}
            />
          </View>
        </View>
      </View>
    ),
    [expires, number],
  );

  const renderBack = useCallback(
    () => (
      <View style={[styles.content, { transform: [{ scaleX: -1 }] }]}>
        <Image source={Icons.logo} />
        <Text style={[styles.details, { fontSize: 12, marginTop: 12 }]}>
          CVV: {cvv}
        </Text>
      </View>
    ),
    [cvv],
  );

  return (
    <Animated.View
      style={[
        styles.card,
        style,
        { opacity, transform: [{ scale }, { scaleX }] },
      ]}>
      <LinearGradient
        colors={[Palette.secondary, Palette.primary]}
        start={{ x: 1, y: 0.5 }}
        end={{ x: 0, y: 0.8 }}
        style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={flipSide}
          style={{ flex: 1 }}
          containerStyle={{ flex: 1, padding: 24 }}>
          {flipped ? renderBack() : renderFront()}
        </TouchableOpacity>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 15,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  details: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    opacity: 0.9,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 20,
    opacity: 0.8,
  },
  mc: {
    flexDirection: 'row-reverse',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
