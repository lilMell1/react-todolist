import { configureStore, StoreCreator } from '@reduxjs/toolkit';
import { persistStore, persistReducer, WebStorage } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import taskReducer from './taskSlice';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

// Persist configuration

type PersistConfig = {
  key: "root";
  storage: WebStorage;
} 
const persistConfig : PersistConfig = {
  key: 'root', //the root key in the local storage
  storage,
};

const persistedReducer = persistReducer(persistConfig, taskReducer);// This allows your task data to be automatically saved and 
                                                                    //rehydrated ()

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => // ignore the warnings in console.
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // Configures the default middleware to ignore serialization warnings for specific redux-persist actions.
        // This is necessary because these actions often involve non-serializable data.
      },
    }),
});

// Create the persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
