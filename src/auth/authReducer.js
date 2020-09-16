import { types } from '../types/types';

export const authReducer = (state = {}, action) => {
  if (!action) return state;

  switch (action.type) {
    case types.LOGIN:
      return {
        ...action.payload,
        authenticated: true,
      };
    case types.LOGOUT:
      return {
        authenticated: false,
      };
    default:
      return state;
  }
};
