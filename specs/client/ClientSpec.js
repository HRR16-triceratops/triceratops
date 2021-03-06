/*eslint-env mocha */
import { expect } from 'chai';
import * as actions from '../../client/actions/index.js';
import * as types from '../../client/constants/ActionTypes.js';

describe('Actions', () => {
  it('should create an action to open general popup', () => {
    const content = 'Test success';
    const expectedAction = {
      type: types.popupOpen,
      payload: content
    };
    expect(actions.popupOpen(content)).to.equal(expectedAction);
  });
});
