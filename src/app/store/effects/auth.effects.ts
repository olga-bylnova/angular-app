import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, catchError, of, tap } from "rxjs";
import { login, loginFailure, loginSuccess, register, registerFailure, registerSuccess } from "../actions/auth.actions";
import { Router } from "@angular/router";
import { UserService } from "../../auth/services/user.service";

@Injectable()
export class AuthEffects {
  private userService: UserService = inject(UserService);
  private actions$: Actions = inject(Actions);
  private router: Router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(({email, password}) =>
        this.userService.getUserByEmailAndPassword(email, password).pipe(
          map(users => {
            if (!users.length) {
              return loginFailure({error: 'Invalid email or password'});
            }
            return loginSuccess({user: users[0]});
          }),
          catchError((error) =>
            of(loginFailure({error}))
          )
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(() => this.router.navigate(['']))
      ),
    {dispatch: false}
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      switchMap(({email, password}) =>
        this.userService.getUserByEmail(email).pipe(
          switchMap(existingUsers => {
            if (existingUsers.length) {
              return of(registerFailure({error: 'User with such email already exists'}));
            } else {
              return this.userService.createUser(email, password).pipe(
                map(newUser => registerSuccess({user: newUser})),
              );
            }
          }),
          catchError((error) =>
            of(registerFailure({error}))
          )
        )
      )
    )
  );

  registerSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(registerSuccess),
        tap(() => this.router.navigate(['']))
      ),
    {dispatch: false}
  );
}
