import React, { useCallback, useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useTimingTransition } from 'react-native-redash/lib/module/v1';
import Animated from 'react-native-reanimated';

export type PopupContext = {
  toast?: React.ReactElement;
  transition?: Animated.Value<number>;
  showPopup: (component: React.ReactElement, duration?: number) => void;
};

export const PopupContext = React.createContext<PopupContext>({
  showPopup: () => null,
});

const fadeDuration = 400;

export const PopupProvider: React.FunctionComponent = ({ children }) => {
  const [toast, setPopup] = useState<React.ReactElement>();
  const [hasPopup, setHasPopup] = useState<boolean>(false);
  const transition = useTimingTransition(hasPopup, {
    duration: fadeDuration,
  });

  const hideToast = useCallback(() => {
    setHasPopup(false);
    const timeout = setTimeout(() => {
      setPopup(undefined);
    }, fadeDuration);
    return () => clearTimeout(timeout);
  }, []);

  const showPopup = useCallback(
    (toast: React.ReactElement, duration = 3000) => {
      setPopup(toast);
      setHasPopup(true);
      const timeout = setTimeout(hideToast, duration);
      return () => clearTimeout(timeout);
    },
    [hideToast],
  );

  return (
    <PopupContext.Provider value={{ showPopup, toast, transition }}>
      {children}
    </PopupContext.Provider>
  );
};

export const PopupContainer: React.FunctionComponent = () => {
  const { toast, transition } = useContext(PopupContext);

  return toast ? (
    <Animated.View
      needsOffscreenAlphaCompositing
      pointerEvents={'box-none'}
      style={[StyleSheet.absoluteFill, [{ opacity: transition }]]}>
      {toast}
    </Animated.View>
  ) : null;
};
