import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationBarComponent } from './navigation-bar.component';
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { logout } from "../../../store/actions/auth.actions";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "../../../products/pages/home/home.component";
import { AuthPageComponent } from "../../../auth/pages/auth-page/auth-page.component";

describe('NavigationBarComponent', () => {
  let component: NavigationBarComponent;
  let fixture: ComponentFixture<NavigationBarComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NavigationBarComponent,
        RouterModule.forRoot(
          [{path: '', component: HomeComponent}, {path: 'auth', component: AuthPageComponent}]
        )
      ],
      providers: [provideMockStore({})]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NavigationBarComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch logout action', () => {
    spyOn(store, 'dispatch');
    component.logout();

    expect(store.dispatch).toHaveBeenCalledWith(logout());
  });
});
