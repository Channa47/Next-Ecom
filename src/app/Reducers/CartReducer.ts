/* eslint-disable @typescript-eslint/no-explicit-any */
const cartState = {
  products: [],
};

export const CartReducers = (
  state = cartState,
  payload: { type: string; products: any }
) => {
  switch (payload.type) {
    case "MODIFY_CART":
      return { ...state, products: payload?.products };
    default:
      return state;
  }
};
