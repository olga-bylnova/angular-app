import {
  login,
  loginSuccess,
  loginFailure,
  logout,
} from '../actions/auth.actions';
import { authReducer } from "./auth.reducers";

describe('AuthReducer', () => {
  const initialState = {
    user: null,
    loading: false,
    error: null,
  };

  it('should return initial state', () => {
    const action = {type: 'Unknown'} as any;
    const state = authReducer(initialState, action);

    expect(state).toBe(initialState);
  });

  it('should set loading true on login', () => {
    const credentials = {email: 'test@com', password: '123'};

    const state = authReducer(initialState, login(credentials));

    expect(state).toEqual({
      user: null,
      loading: true,
      error: null,
    });
  });

  it('should set user on loginSuccess', () => {
    const user = {id: 1, name: 'John'};

    const state = authReducer(initialState, loginSuccess({user}));

    expect(state).toEqual({
      user,
      loading: false,
      error: null,
    });
  });

  it('should set error on loginFailure', () => {
    const error = 'Invalid credentials';

    const state = authReducer(initialState, loginFailure({error}));

    expect(state).toEqual({
      user: null,
      loading: false,
      error,
    });
  });

  it('should reset state on logout', () => {
    const modifiedState = {
      user: {id: 1},
      loading: false,
      error: 'error',
    };

    const state = authReducer(modifiedState, logout());

    expect(state).toEqual(initialState);
  });
});
