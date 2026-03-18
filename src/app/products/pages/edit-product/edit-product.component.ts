import { Component, inject, OnInit } from '@angular/core';
import { EditProductDto } from '../../models/edit-product-dto';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PositiveIntegerValidatorDirective } from '../../../shared/directives/positive-integer-validator.directive';
import { PositiveDoubleValidatorDirective } from '../../../shared/directives/positive-double-validator.directive';
import { ProductService } from '../../services/product.service';
import { Store } from "@ngrx/store";
import { ProductState } from "../../../store/models/product.model";
import { updateProduct } from "../../../store/actions/product.actions";

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [FormsModule, PositiveIntegerValidatorDirective, PositiveDoubleValidatorDirective],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {
  private productService: ProductService = inject(ProductService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private store = inject(Store<ProductState>);

  productDto: EditProductDto | undefined;
  private productId: number = 0;

  ngOnInit() {
    this.productId = Number(this.route.snapshot.params['id']);
    this.productService.getProductById(this.productId).subscribe(product => {
      this.productDto = {
        title: product.title,
        price: product.price,
        description: product.description,
        image: product.image,
        stock: product.stock
      };
    });
  }

  onSubmit() {
    if (this.productDto) {
      this.productDto.stock = Number(this.productDto.stock);
      this.productDto.price = Number(this.productDto.price);

      this.store.dispatch(updateProduct({productDto: this.productDto, productCode: this.productId}));
    }
  }
}
