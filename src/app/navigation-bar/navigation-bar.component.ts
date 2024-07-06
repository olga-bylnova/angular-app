import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAt, faCartShopping, faSearch, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent {
  faAt = faAt;
  faCartShopping = faCartShopping;
  faSearch = faSearch;
  faArrowRightFromBracket = faArrowRightFromBracket;
}
