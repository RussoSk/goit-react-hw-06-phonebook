
import { configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import { addContactSlice, filterSlice } from '../redux/contactsSlice';

const persistContactsConfig = {
  key: 'contacts',
  storage,
};

const persistedContactReducer = persistReducer(
  persistContactsConfig,
  addContactSlice.reducer
);

export const store = configureStore({
  reducer: {
    contacts: persistedContactReducer, 
    filter: filterSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
  }),
});

export const persistor = persistStore(store);
