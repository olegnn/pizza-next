import storage from "localforage";
import { createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import immutableTransform from "redux-persist-transform-immutable";

import rootReducer from "./reducers";
import { Details, Product, ProductConfiguration, ProductConfigurationSelection } from './types';
import { hasWindow } from "./utils";

const persistConfig = {
  transforms: [
    immutableTransform({ records: [Product, Details, ProductConfiguration, ProductConfigurationSelection] })
  ],
  blacklist: ["ui"],
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  hasWindow() && process.env.NODE_ENV !== 'production' &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const persistor = persistStore(store);

process.env.CLEAR_PERSISTOR && persistor.purge();

export default store;
