// import { applyMiddleware, combineReducers, createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import accountReducer from "./features/accounts/AccountSlice.js";
import customerReducer from "./features/customers/CustomerSlice.js";

// configure store accepts obj of options
const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

// const rootReducer = combineReducers({
//   account: accountReducer,
//   customer: customerReducer,
// });
// const store = createStore(rootReducer, applyMiddleware(thunk));
// const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
