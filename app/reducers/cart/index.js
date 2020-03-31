import products from "./products";
import prices from "./prices";
import currency from "./currency";
import { combineReducers } from "redux";

export default combineReducers({ products, prices, currency });
