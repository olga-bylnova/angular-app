import { Observable, of } from "rxjs";
import { AuthEffects } from "./auth.effects";
import { UserService } from "../../auth/services/user.service";
import { Router } from "@angular/router";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { login, loginFailure, loginSuccess, register, registerFailure, registerSuccess } from "../actions/auth.actions";

describe('AuthEffects', () => {
  let actions$: Observable<any>;
  let effects: AuthEffects;
  let userService: jasmine.SpyObj<UserService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    userService = jasmine.createSpyObj('UserService', [
      'getUserByEmailAndPassword',
      'getUserByEmail',
      'createUser',
    ]);

    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        {provide: UserService, useValue: userService},
        {provide: Router, useValue: router},
      ],
    });

    effects = TestBed.inject(AuthEffects);
  });

  it('should return loginSuccess when user exists', (done) => {
    const mockUser = {id: 1, email: 'test@test.com'};

    userService.getUserByEmailAndPassword.and.returnValue(of([mockUser]));

    actions$ = of(login({email: 'test@test.com', password: '123'}));

    effects.login$.subscribe((result) => {
      expect(result).toEqual(loginSuccess({user: mockUser}));
      done();
    });
  });

  it('should return loginFailure when user does not exist', (done) => {
    userService.getUserByEmailAndPassword.and.returnValue(of([]));

    actions$ = of(login({email: 'test@test.com', password: '123'}));

    effects.login$.subscribe((result) => {
      expect(result).toEqual(loginFailure({error: 'Invalid email or password'}));
      done();
    });
  });

  it('should navigate on loginSuccess', (done) => {
    actions$ = of(loginSuccess({user: {id: 1}}));

    effects.loginSuccess$.subscribe(() => {
      expect(router.navigate).toHaveBeenCalledWith(['']);
      done();
    });
  });

  it('should return registerFailure when user exists', (done) => {
    const mockUser = {id: 1, email: 'test@test.com'};

    userService.getUserByEmail.and.returnValue(of([mockUser]));

    actions$ = of(register({email: 'test@test.com', password: '123'}));

    effects.register$.subscribe((result) => {
      expect(result).toEqual(registerFailure({error: 'User with such email already exists'}));
      done();
    });
  });

  it('should return registerSuccess when user does not exist', (done) => {
    const mockUser = {id: 1, email: 'test@test.com'};

    userService.getUserByEmail.and.returnValue(of([]));
    userService.createUser.and.returnValue(of(mockUser));

    actions$ = of(register({email: 'test@test.com', password: '123'}));

    effects.register$.subscribe((result) => {
      expect(result).toEqual(registerSuccess({user: mockUser}));
      done();
    });
  });

  it('should navigate on registerSuccess', (done) => {
    actions$ = of(registerSuccess({user: {id: 1}}));

    effects.registerSuccess$.subscribe(() => {
      expect(router.navigate).toHaveBeenCalledWith(['']);
      done();
    });
  });
});
