import { authReducer } from '../../auth/authReducer';
import { types } from '../../types/types';
import '@testing-library/jest-dom';

describe('Testing to authReducer', () => {
  const initialState = {
    authenticated: false,
  };

  test('should return default state', () => {
    const state = authReducer(initialState);

    expect(state).toEqual(initialState);
  });

  test('should to auth and set user name', () => {
    const userLogIn = {
      name: 'Ricardo',
    };

    const action = {
      type: types.LOGIN,
      payload: userLogIn,
    };

    const state = authReducer(initialState, action);

    expect(state).toEqual({ ...userLogIn, authenticated: true });
  });

  test('should to delete user name and set authenticated prop in false', () => {
    const action = {
      type: types.LOGOUT,
    };

    const state = authReducer({ name: 'Camila', authenticated: true }, action);

    expect(state).toEqual(initialState);
  });
});
