import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import userReducer from "./auth/userReducer";
import requestReducer from "./requests/requestReducer";
import { thunk } from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  requests: requestReducer,
});
const persistedReducer = persistReducer(persistConfig, userReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export { store, persistor };
