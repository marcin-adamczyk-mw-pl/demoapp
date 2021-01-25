import React from 'react';
import { Text, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { Palette } from '../theme/palette';

export const Header: React.FunctionComponent<{
  title: string;
  style?: StyleProp<TextStyle>;
}> = ({ title, style }) => <Text style={[styles.header, style]}>{title}</Text>;

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    margin: 16,
    marginTop: 32,
    color: Palette.accent,
  },
});
