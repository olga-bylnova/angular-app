import { createReducer, on } from "@ngrx/store";
import { AuthState } from "../models/auth.model";
import {
  login,
  loginFailure,
  loginSuccess,
  logout,
  register,
  registerFailure,
  registerSuccess
} from "../actions/auth.actions";

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loginSuccess, (state, {user}) => ({
    ...state,
    loading: false,
    user,
  })),
  on(loginFailure, (state, {error}) => ({
    ...state,
    loading: false,
    error,
  })),
  on(logout, () => initialState),
  on(register, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(registerSuccess, (state, {user}) => ({
    ...state,
    loading: false,
    user,
  })),
  on(registerFailure, (state, {error}) => ({
    ...state,
    loading: false,
    error,
  })),
);
