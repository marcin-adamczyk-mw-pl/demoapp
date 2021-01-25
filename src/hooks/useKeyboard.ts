import { useEffect, useState } from 'react';
import { Keyboard, KeyboardEventName, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const KEYBOARD_UP = Platform.select<KeyboardEventName>({
  ios: 'keyboardWillShow',
  android: 'keyboardDidShow',
})!;
const KEYBOARD_DOWN = Platform.select<KeyboardEventName>({
  ios: 'keyboardWillHide',
  android: 'keyboardDidHide',
})!;

export const useKeyboard = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showListener = () => setKeyboardVisible(true);
    const hideListener = () => setKeyboardVisible(false);
    Keyboard.addListener(KEYBOARD_UP, showListener);
    Keyboard.addListener(KEYBOARD_DOWN, hideListener);
    return () => {
      Keyboard.removeListener(KEYBOARD_UP, showListener);
      Keyboard.removeListener(KEYBOARD_DOWN, hideListener);
    };
  }, []);
  return { keyboardVisible };
};

export const useKeyboardAvoidingOffset = (offset = 250) => {
  const { keyboardVisible } = useKeyboard();
  const insets = useSafeAreaInsets();

  return Platform.OS === 'ios' && keyboardVisible
    ? { paddingBottom: offset + insets.bottom }
    : {};
};
