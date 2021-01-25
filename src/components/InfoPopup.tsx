import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Palette } from '../theme/palette';

export const InfoPopup: React.FunctionComponent<{ message: string }> = ({
  message,
}) => (
  <View style={styles.container}>
    <Text style={styles.message}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 90,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: Palette.accent,
    marginHorizontal: 64,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    shadowOpacity: 0.2,
    shadowColor: Palette.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  message: {
    fontSize: 15,
    fontWeight: '300',
    color: 'white',
  },
});
