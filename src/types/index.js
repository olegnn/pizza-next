import { Map, Record } from "immutable";
import { getCurrentTimeString } from '../utils';

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
    time: getCurrentTimeString()
  },
  "Details"
);

export const UI = Record(
  { leftDrawerOpen: false, rightDrawerOpen: false, selectedProduct: null },
  "UI"
);

export const ProductConfiguration = Record(
  { toppings: new Map(), selectedConfiguration: 0 },
  "ProductConfiguration"
);