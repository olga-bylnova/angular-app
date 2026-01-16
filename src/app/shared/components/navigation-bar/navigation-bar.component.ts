import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAt, faCartShopping, faSearch, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { Store } from "@ngrx/store";
import { AuthState } from "../../../store/models/auth.model";
import { selectIsLoggedIn } from "../../../store/selectors/auth.selectors";
import { Observable } from "rxjs";
import { logout } from "../../../store/actions/auth.actions";

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule, CommonModule],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent {
  private store = inject(Store<AuthState>);

  faAt = faAt;
  faCartShopping = faCartShopping;
  faSearch = faSearch;
  faArrowRightFromBracket = faArrowRightFromBracket;

  isUserLoggedIn$: Observable<boolean> = this.store.select(selectIsLoggedIn);

  logout() {
    this.store.dispatch(logout());
  }
}
