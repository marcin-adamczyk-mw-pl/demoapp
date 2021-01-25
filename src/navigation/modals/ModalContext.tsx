import React, { ReactElement, useCallback, useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTimingTransition } from 'react-native-redash/lib/module/v1';
import Animated from 'react-native-reanimated';
import { useAndroidBackButton } from '../../hooks';

export type ModalContext = {
  modal?: ReactElement;
  transition?: Animated.Value<number>;
  showModal: (component: ReactElement) => void;
  dismissModal: () => void;
};

export const ModalContext = React.createContext<ModalContext>({
  showModal: () => null,
  dismissModal: () => null,
});

const animDuration = 400;

export const ModalProvider: React.FunctionComponent = ({ children }) => {
  const [modal, setModal] = useState<React.ReactElement>();
  const [hasModal, setHasModal] = useState<boolean>(false);

  const transition = useTimingTransition(hasModal, {
    duration: animDuration,
  });

  const hideModal = useCallback(() => {
    setHasModal(false);
    const timeout = setTimeout(() => setModal(undefined), animDuration);
    return () => clearTimeout(timeout);
  }, []);

  const showModal = useCallback((element: React.ReactElement) => {
    setModal(element);
    setHasModal(true);
  }, []);

  return (
    <ModalContext.Provider
      value={{ showModal, dismissModal: hideModal, modal, transition }}>
      {children}
    </ModalContext.Provider>
  );
};

export const ModalContainer: React.FunctionComponent = () => {
  const { modal, transition, dismissModal } = useContext(ModalContext);

  useAndroidBackButton(() => {
    if (modal) {
      dismissModal();
      return true;
    } else {
      return false;
    }
  }, [modal, dismissModal]);

  return modal ? (
    <View style={StyleSheet.absoluteFill} pointerEvents={'box-none'}>
      <Animated.View
        pointerEvents={!modal ? 'box-none' : 'auto'}
        style={[styles.overlayBg, { opacity: transition }]}
      />
      <Animated.View
        pointerEvents={'box-none'}
        style={[
          StyleSheet.absoluteFill,
          styles.dialog,
          { opacity: transition },
        ]}>
        {modal}
      </Animated.View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  overlayBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  dialog: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
  },
});
