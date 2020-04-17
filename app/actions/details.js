import { always } from 'ramda';
import * as DETAILS_ACTIONS from '../actionTypes/details';

export const setDetails = (key, value) => ({
  type: DETAILS_ACTIONS.SET,
  payload: {
    key,
    value
  }
});

export const clearDetails = always({ type: DETAILS_ACTIONS.CLEAR });
