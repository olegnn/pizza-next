import { not } from 'ramda';
import { createReducer, createHandlers } from '../utils';
import * as UI_ACTIONS from '../actionTypes/ui';
import { DRAWERS } from '../actions/ui';
import { UI } from '../types';

const initialState = new UI();

const handlers = createHandlers({
  [UI_ACTIONS.TOGGLE_DRAWER]: (state, { drawer }) =>
    state.update(
      drawer === DRAWERS.RIGHT ? 'rightDrawerOpen' : 'leftDrawerOpen',
      not
    ),
  [UI_ACTIONS.SELECT_ELEMENT]: (state, { id }) =>
    state.set('selectedElement', id)
});

export default createReducer(initialState, handlers);
