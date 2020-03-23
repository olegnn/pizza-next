import { Record, Map } from "immutable";

// export const Option = Record({ attr: null, weight: null, capacity: null });

export const Product = Record(
  {
    id: null,
    quantity: 0,
    // maxQuantity: Infinity,
    toppings: new Map(),
    selectedOption: 0
  },
  "Product"
);

export const Details = Record({ address: "" }, "Details");

export const UI = Record({ cartOpen: false, selectedProduct: null }, "UI");

export const ProductConfiguration = Record(
  { toppings: new Map(), selectedOption: 0 },
  "ProductConfiguration"
);
