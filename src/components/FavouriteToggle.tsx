import React from 'react';
import {
  Image,
  ImageStyle,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { Icons } from '../../assets/icons';

type Props = {
  isFavorite: boolean;
  toggle: () => void;
  size?: number;
  style?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ImageStyle>;
};

export const FavoriteToggle: React.FunctionComponent<Props> = ({
  isFavorite,
  toggle,
  style,
  iconStyle,
  size = 24,
}) => {
  return (
    <TouchableOpacity style={style} onPress={toggle}>
      <Image
        source={isFavorite ? Icons.heart : Icons.heart_outline}
        style={[{ tintColor: 'white', width: size, height: size }, iconStyle]}
      />
    </TouchableOpacity>
  );
};
