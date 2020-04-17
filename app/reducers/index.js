import { combineReducers } from 'redux';
import cart from './cart';
import details from './details';
import overlay from './overlay';
import ui from './ui';

export default combineReducers({ cart, details, overlay, ui });
