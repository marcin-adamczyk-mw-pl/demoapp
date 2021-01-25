import 'react-native-gesture-handler';
import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store, persistor } from './features/store';
import { PersistGate } from 'redux-persist/integration/react';
import { AppNavigator } from './navigation/AppNavigator';
import { PopupProvider } from './navigation/modals/PopupContext';
import { enableScreens } from 'react-native-screens';

enableScreens();

const App = () => (
  <SafeAreaProvider>
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PopupProvider>
          <AppNavigator />
        </PopupProvider>
      </PersistGate>
    </StoreProvider>
  </SafeAreaProvider>
);

export default App;
