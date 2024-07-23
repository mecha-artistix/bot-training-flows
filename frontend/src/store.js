import { combineReducers, createStore } from "redux";

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    // case 'stateDomain/eventName':
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: action.payload.amount + state.balance,
      };
    case "account/payloan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
}

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
const store = createStore(rootReducer);

function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}
function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount: amount, purpose: purpose },
  };
}
function payLoan(amount) {
  return { type: "account/payLoan" };
}

store.dispatch(deposit(4000));

// console.log(store.getState());

function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

function updateName(fullName) {
  return { type: "customer/updateName", payload: fullName };
}

store.dispatch(createCustomer("Huzaifa", "pk"));

console.log(store.getState());
