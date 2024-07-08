import { Component, Input } from '@angular/core';
import { Review } from '../model/review';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-customer-review',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './customer-review.component.html',
  styleUrl: './customer-review.component.css'
})
export class CustomerReviewComponent {
  @Input() review!: Review;
  faStar = faStar;
}
