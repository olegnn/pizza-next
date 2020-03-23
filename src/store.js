import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import rootReducer from "./reducers";
import storage from "localforage";
import immutableTransform from "redux-persist-transform-immutable";
import { Product, Details, ProductConfiguration } from "./types";

function hasWindow() {
  try {
    window;
    return true;
  } catch (e) {
    return false;
  }
}

const persistConfig = {
  transforms: [
    immutableTransform({ records: [Product, Details, ProductConfiguration] })
  ],
  blacklist: ["ui"],
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  hasWindow() &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const persistor = persistStore(store);

// persistor.purge();

export default store;
