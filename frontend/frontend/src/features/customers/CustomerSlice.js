import { createSlice } from "@reduxjs/toolkit";
// above gives us 3 benefits. 1-auto create action creators from our reducers, 2-It makes writing reducers easy as we dont need switch case. 3- it helps mutate state inside reducers (behind the scnes it users 3rd party lib called immer)

const initialState = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

// const customerSlice = createSlice({
//   name: "customer",
//   initialState,
//   reducers: {
//     createCustomer(state, action) {
//       // we can write mutating logic in here
//       state.balance = state.balance + action.payload;
//     },
//     updateName(state, action) {},
//   },
// });

export default function customerReducer(state = initialState, action) {
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

export function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

export function updateName(fullName, multiplier) {
  return { type: "customer/updateName", payload: fullName };
}
