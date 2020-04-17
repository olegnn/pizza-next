import { combineReducers } from 'redux';
import products from './products';
import prices from './prices';
import currency from './currency';

export default combineReducers({ products, prices, currency });
