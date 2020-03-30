import { Map, Record } from "immutable";

// export const Option = Record({ attr: null, weight: null, capacity: null });

export const Product = Record(
  {
    id: null,
    quantity: 0,
    // maxQuantity: Infinity,
    toppings: new Map(),
    selectedConfiguration: 0
  },
  "Product"
);

export const Details = Record(
  {
    name: "",
    email: "",
    phone: "",
    payment: "cash",
    address1: "",
    address2: "",
    time: new Date().toISOString().match(/\d\d\:\d\d/)[0]
  },
  "Details"
);

export const UI = Record({ drawerOpen: false, selectedProduct: null }, "UI");

export const ProductConfiguration = Record(
  { toppings: new Map(), selectedConfiguration: 0 },
  "ProductConfiguration"
);
