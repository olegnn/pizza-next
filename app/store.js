import storage from 'localforage';
import { createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';

import rootReducer from './reducers';
import {
  Details,
  Product,
  ProductConfiguration,
  ProductConfigurationSelection
} from './types';
import { hasWindow } from './utils';

export const createClientStore = () => {
  const persistConfig = {
    transforms: [
      immutableTransform({
        records: [
          Product,
          Details,
          ProductConfiguration,
          ProductConfigurationSelection
        ]
      })
    ],
    blacklist: ['ui'],
    key: 'root',
    storage
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(
    persistedReducer,
    hasWindow() &&
      // eslint-disable-next-line no-undef
      process.env.NODE_ENV !== 'production' &&
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  const persistor = persistStore(store);

  /*
  // If JS is enabled, force left drawer to be closed
  // Disabled because most of clients have JS enabled
  // and this improvement may cause them to see incorrect
  // representation during page loading
  // store.dispatch(toggleDrawer(DRAWERS.LEFT));
  */

  // eslint-disable-next-line no-undef
  process.env.CLEAR_PERSISTOR && persistor.purge();

  return { store, persistor };
};

export const createServerStore = () => ({ store: createStore(rootReducer) });
