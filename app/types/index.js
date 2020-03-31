import { Map, Record } from "immutable";
import { getCurrentTimeString } from "../utils";

export const ProductConfigurationSelection = Record(
  { seqId: 0, id: null },
  "ProductConfigurationSelection"
);

export const Product = Record(
  {
    id: null,
    quantity: 0,
    toppings: new Map(),
    selectedConfiguration: ProductConfigurationSelection
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