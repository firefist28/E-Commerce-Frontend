import { createStore } from 'redux';
import { authReducer } from './reducers/authReducer';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);