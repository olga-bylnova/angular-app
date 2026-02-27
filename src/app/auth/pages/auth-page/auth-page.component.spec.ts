import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPageComponent } from './auth-page.component';
import { ReactiveFormsModule } from "@angular/forms";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { login, register } from "../../../store/actions/auth.actions";

describe('AuthPageComponent', () => {
  let component: AuthPageComponent;
  let fixture: ComponentFixture<AuthPageComponent>;
  let store: MockStore;
  let element: DebugElement;
  let form: DebugElement;

  const initialState = {
    auth: {
      user: null,
      loading: false,
      error: null,
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPageComponent, ReactiveFormsModule],
      providers: [
        provideMockStore({initialState}),
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AuthPageComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    element = fixture.debugElement;
    form = element.query(By.css('form'));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should alert when auth error appears', () => {
    spyOn(window, 'alert');
    store.setState({
      auth: {
        user: null,
        loading: false,
        error: "Invalid email or password",
      }
    });
    store.refreshState();

    expect(window.alert).toHaveBeenCalledWith("Invalid email or password");
  });

  describe('onSubmit', () => {
    beforeEach(() => {
      spyOn(store, 'dispatch');
      component.authForm.setValue({
        email: 'test@com',
        password: '123456',
      });

      fixture.detectChanges();
    });

    it('should dispatch login action in login mode', () => {
      component.isLoginMode = true;

      component.onSubmit();

      expect(store.dispatch).toHaveBeenCalledWith(
        login({email: 'test@com', password: '123456'})
      );
    });

    it('should dispatch register action in register mode', () => {
      component.isLoginMode = false;

      component.onSubmit();

      expect(store.dispatch).toHaveBeenCalledWith(
        register({email: 'test@com', password: '123456'})
      );
    });

    it('should reset form after submit', () => {
      component.onSubmit();

      expect(component.authForm.value).toEqual({
        email: null,
        password: null,
      });
    });
  });

  describe('Login/Register mode switch', () => {
    it('header should show "Sing in" when it is login mode', () => {
      let header = element.query(By.css('.auth-form-header')).nativeElement as HTMLButtonElement;
      component.isLoginMode = true;

      fixture.detectChanges();

      expect(header.textContent).toEqual('Sign in');
    });

    it('header should show "Register" when it is register mode', () => {
      let header = element.query(By.css('button[type="submit"]')).nativeElement as HTMLButtonElement;
      component.isLoginMode = false;

      fixture.detectChanges();

      expect(header.textContent).toEqual('Register');
    });

    it('submit button should show "Login" when it is login mode', () => {
      let submitButton = element.query(By.css('button[type="submit"]')).nativeElement as HTMLButtonElement;
      component.isLoginMode = true;

      fixture.detectChanges();

      expect(submitButton.textContent).toEqual('Login');
    });

    it('submit button should show "Register" when it is register mode', () => {
      let submitButton = element.query(By.css('button[type="submit"]')).nativeElement as HTMLButtonElement;
      component.isLoginMode = false;

      fixture.detectChanges();

      expect(submitButton.textContent).toEqual('Register');
    });
  });

  describe('form validation', () => {
    it('should be valid for correct input', () => {
      component.authForm.setValue({
        email: 'test@com',
        password: '123456',
      });

      fixture.detectChanges();
      expect(component.authForm.valid).toEqual(true);
    });

    it('should not be valid for empty email', () => {
      let emailControl = component.authForm.get('email');
      component.authForm.setValue({
        email: '',
        password: '123456',
      });

      fixture.detectChanges();

      expect(component.authForm.invalid).toEqual(true);
      expect(emailControl?.invalid).toEqual(true);
      expect(emailControl?.errors).toEqual({'required': true});
    });

    it('should not be valid for wrong email', () => {
      let emailControl = component.authForm.get('email');
      component.authForm.setValue({
        email: 'test',
        password: '123456',
      });

      fixture.detectChanges();

      expect(component.authForm.invalid).toEqual(true);
      expect(emailControl?.invalid).toEqual(true);
      expect(emailControl?.errors).toEqual({'email': true});
    });

    it('should not be valid for empty password', () => {
      let passwordControl = component.authForm.get('password');
      component.authForm.setValue({
        email: 'test@com',
        password: '',
      });

      fixture.detectChanges();

      expect(component.authForm.invalid).toEqual(true);
      expect(passwordControl?.invalid).toEqual(true);
      expect(passwordControl?.errors).toEqual({'required': true});
    });

    describe('submit button', () => {
      let submitButton: HTMLButtonElement;
      beforeEach(() => {
        submitButton = element.query(By.css('button[type="submit"]')).nativeElement as HTMLButtonElement;
      });

      it('should be enabled when form is valid', () => {
        component.authForm.setValue({
          email: 'test@com',
          password: '123456',
        });

        fixture.detectChanges();

        expect(submitButton.disabled).toEqual(false);
      });

      it('should be disabled when form is invalid', () => {
        component.authForm.setValue({
          email: '',
          password: '',
        });

        fixture.detectChanges();

        expect(submitButton.disabled).toEqual(true);
      });
    });
  });

  it('should switch auth mode on button click', () => {
    component.isLoginMode = true;
    fixture.detectChanges();

    const switchButton = element.query(By.css('button[type=button]'));
    switchButton.triggerEventHandler('click');

    expect(component.isLoginMode).toBeFalse();
  });
});
