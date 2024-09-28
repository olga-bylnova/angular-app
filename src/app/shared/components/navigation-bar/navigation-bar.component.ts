import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAt, faCartShopping, faSearch, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule, CommonModule],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent {
  faAt = faAt;
  faCartShopping = faCartShopping;
  faSearch = faSearch;
  faArrowRightFromBracket = faArrowRightFromBracket;
  isUserLoggedIn = false;

  authService: AuthService = inject(AuthService);

  ngOnInit() {
    this.authService.isUserLoggedIn$.subscribe(isLoggedIn => {
      this.isUserLoggedIn = isLoggedIn;
    });
  }

  logout() {
    this.authService.logout();
  }
}
