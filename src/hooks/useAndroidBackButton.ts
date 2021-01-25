import { DependencyList, useCallback, useEffect } from 'react';
import { BackHandler } from 'react-native';

export const useAndroidBackButton = (
  callback: () => boolean,
  deps?: DependencyList,
) => {
  const listener = useCallback(callback, deps);
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', listener);
    return () => BackHandler.removeEventListener('hardwareBackPress', listener);
  }, [listener]);
};

export const useDisabledAndroidBackButton = () => {
  useAndroidBackButton(() => true, []);
};
