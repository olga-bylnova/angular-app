import { createAction, props } from "@ngrx/store";
import { User } from "../../shared/models/user";

export const login = createAction(
  '[Auth API] Login',
  props<{ email: string, password: string }>()
);

export const loginSuccess = createAction(
  '[Auth API] Login Success',
  props<{ user: User }>()
);

export const loginFailure = createAction(
  '[Auth API] login Failure',
  props<{ error: any }>()
);

export const logout = createAction(
  '[Auth API] Logout'
);

export const register = createAction(
  '[Auth API] Register',
  props<{ email: string, password: string }>()
);

export const registerSuccess = createAction(
  '[Auth API] Register Success',
  props<{ user: User }>()
);

export const registerFailure = createAction(
  '[Auth API] Register Failure',
  props<{ error: any }>()
);

