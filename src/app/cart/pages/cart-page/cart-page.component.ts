import { Component, inject, OnInit } from '@angular/core';
import { CartItem } from '../../models/cart-item';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRectangleXmark } from '@fortawesome/free-solid-svg-icons';
import { animate, style, transition, trigger } from '@angular/animations';
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { CartState } from "../../../store/models/cart.model";
import { selectCartItems } from "../../../store/selectors/cart.selectors";
import { deleteCartItem, loadCart } from "../../../store/actions/cart.actions";

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
  animations: [
    trigger('rowAnimation', [
      transition(':enter', [
        style({transform: 'translateX(-100%)', opacity: 0}),
        animate('500ms ease-out', style({transform: 'translateX(0)', opacity: 1}))
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({transform: 'translateX(-100%)', opacity: 0}))
      ])
    ])
  ]
})
export class CartPageComponent implements OnInit {
  private store = inject(Store<CartState>);

  cartItems$: Observable<CartItem[]> = this.store.select(selectCartItems);
  faRectangleXmark = faRectangleXmark;

  ngOnInit() {
    this.store.dispatch(loadCart());
  }

  deleteCartItem(cartItemId: number) {
    this.store.dispatch(deleteCartItem({ cartItemId }));
  }
}
