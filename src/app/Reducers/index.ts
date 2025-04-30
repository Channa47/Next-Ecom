// reducers/index.ts
import { combineReducers } from "redux";
import { CartReducers } from "./CartReducer";

export const rootReducer = combineReducers({
  cart: CartReducers,
  // Add more reducers here if needed
});
