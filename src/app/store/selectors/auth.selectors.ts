import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "../models/auth.model";

export const selectAuthState =
  createFeatureSelector<AuthState>('auth');

export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error,
);

export const selectAuthUser = createSelector(
  selectAuthState,
  (state) => state.user,
);

export const selectIsLoggedIn = createSelector(
  selectAuthUser,
  (user) => !!user,
);

