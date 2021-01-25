import {
  Action,
  configureStore,
  getDefaultMiddleware,
  ThunkAction,
} from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import { data } from './data';
import { favourites } from './favourites';

export type Thunk = ThunkAction<void, RootState, unknown, Action<string>>;

const reducer = combineReducers({
  favourites: favourites.reducer,
  data: data.reducer,
});

export const store = configureStore({
  reducer: persistReducer(
    {
      key: 'root',
      storage: AsyncStorage,
    },
    reducer,
  ),
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof reducer>;
