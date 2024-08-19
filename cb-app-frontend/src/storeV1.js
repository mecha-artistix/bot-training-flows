import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import accountReducer from "./features/accounts/AccountSlice.js";
import customerReducer from "./features/customers/CustomerSlice.js";
// // store is the main central bucket that store all the state of an app

// // on this store we dispatch actions. Dispatch methods on store act same as calling dispatch function in use reducer
// store.dispatch({ type: "account/deposit", payload: 5000 });
// // store.dispatch({ type: "account/withdraw", payload: 1000 });
// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 1000, purpose: "buy a car" },
// });

// const store = createStore(accountReducer, customerReducer); // this just wont work instead we use a func 'combinereducer' from redux to combine all reducers and add them to store
// const customerStore = createStore(customerReducer);
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
