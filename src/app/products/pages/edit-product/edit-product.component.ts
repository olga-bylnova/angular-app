import { Component, inject } from '@angular/core';
import { EditProductDto } from '../../models/edit-product-dto';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PositiveIntegerValidatorDirective } from '../../../shared/directives/positive-integer-validator.directive';
import { PositiveDoubleValidatorDirective } from '../../../shared/directives/positive-double-validator.directive';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [FormsModule, PositiveIntegerValidatorDirective, PositiveDoubleValidatorDirective],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {
  productDto: EditProductDto | undefined;
  productService: ProductService = inject(ProductService);
  route: ActivatedRoute = inject(ActivatedRoute);
  productId: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.productId = Number(this.route.snapshot.params['id']);
    this.productService.getProductById(this.productId).subscribe(product => {
      let newProductDto: EditProductDto = {
        title: product.title || '',
        price: product.price || 0,
        description: product.description || '',
        image: product.image || '',
        stock: product.stock || 0
      };
      this.productDto = newProductDto;
    });
  }

  onSubmit() {
    if (this.productDto) {
      this.productDto.stock = Number(this.productDto.stock);
      this.productDto.price = Number(this.productDto.price);
      this.productService.updateProduct(this.productDto, this.productId);

      this.router.navigate(['']);
    }
  }
}
