import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const accoutSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    // redux toolkit allow only one payload arg. so to pass in multiple we prepare the data before it reaches redux action creator
    requestLoan: {
      prepare(amount, purpose) {
        // here we return an obj that becomes payload for reducer
        return {
          payload: { amount, purpose },
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance = state.balance = action.payload.amount;
      },
    },
    payLoan(state, action) {
      state.loan = 0;
      state.loanPurpose = "";
      state.balance -= state.loan;
    },
  },
});

// console.log(accoutSlice);
export const { deposit, withdraw, requestLoan, payLoan } = accoutSlice.actions;
export default accoutSlice.reducer;
// export default function accountReducer(state = initialState, action) {
//   switch (action.type) {
//     // case 'stateDomain/eventName':
//     case "account/deposit":
//       return { ...state, balance: state.balance + action.payload };
//     case "account/withdraw":
//       return { ...state, balance: state.balance - action.payload };
//     case "account/requestLoan":
//       if (state.loan > 0) return state;
//       return {
//         ...state,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.purpose,
//         balance: action.payload.amount + state.balance,
//       };
//     case "account/payloan":
//       return {
//         ...state,
//         loan: 0,
//         loanPurpose: "",
//         balance: state.balance - state.loan,
//       };
//     default:
//       return state;
//   }
// }

// // ACTION CREATORS
// export function deposit(amount) {
//   return { type: "account/deposit", payload: amount };
// }
// export function withdraw(amount) {
//   return { type: "account/withdraw", payload: amount };
// }
// export function requestLoan(amount, purpose) {
//   return {
//     type: "account/requestLoan",
//     payload: { amount: amount, purpose: purpose },
//   };
// }
// export function payLoan(amount) {
//   return { type: "account/payLoan" };
// }
