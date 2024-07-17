import { Component, inject } from '@angular/core';
import { EditProductDto } from '../dto/edit-product-dto';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PositiveIntegerValidatorDirective } from '../directive/positive-integer-validator.directive';
import { PositiveDoubleValidatorDirective } from '../directive/positive-double-validator.directive';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [FormsModule, PositiveIntegerValidatorDirective, PositiveDoubleValidatorDirective],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {
  productDto: EditProductDto = new EditProductDto('', 0, '', '', 0);
  productService: ProductService = inject(ProductService);
  route: ActivatedRoute = inject(ActivatedRoute);
  productId: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.productId = Number(this.route.snapshot.params['id']);
    this.productService.getProductById(this.productId).then(product => {
      this.productDto = new EditProductDto(product.title, product.price,
        product.description, product.image, product.stock);
    });
  }

  onSubmit() {
    this.productDto.stock = Number(this.productDto.stock);
    this.productDto.price = Number(this.productDto.price);
    this.productService.updateProduct(this.productDto, this.productId);

    this.router.navigate(['']);
  }
}
