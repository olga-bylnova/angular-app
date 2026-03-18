import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductComponent } from './edit-product.component';
import { ActivatedRoute } from "@angular/router";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { ProductService } from "../../services/product.service";
import { Product } from "../../models/product";
import { of } from "rxjs";
import { updateProduct } from "../../../store/actions/product.actions";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";
import { NgForm } from "@angular/forms";

describe('EditProductComponent', () => {
  let component: EditProductComponent;
  let fixture: ComponentFixture<EditProductComponent>;
  let store: MockStore;
  let productService: jasmine.SpyObj<ProductService>;
  let debugElement: DebugElement;

  const mockProduct: Product = {id: 1, stock: 10, title: 'Test product', price: 10, description: 'desc', image: 'img'};
  const mockRoute = {snapshot: {params: {id: "1"}}};
  const mockProductDto = {stock: 10, title: 'Test product', price: 10, description: 'desc', image: 'img'};

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj(ProductService, [
      'getProductById',
    ]);
    await TestBed.configureTestingModule({
      imports: [EditProductComponent],
      providers: [
        provideMockStore({}),
        {provide: ProductService, useValue: productServiceSpy},
        {provide: ActivatedRoute, useValue: mockRoute},
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditProductComponent);
    store = TestBed.inject(MockStore);
    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    productService.getProductById.and.returnValue(of(mockProduct));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize product dto', () => {
    component.ngOnInit();

    expect(component.productDto).toEqual(mockProductDto);
  });

  it('should show "Product not found" when productDto is null', () => {
    component.productDto = undefined;
    fixture.detectChanges();

    const form = debugElement.query(By.css('form'));
    expect(form).toBeFalsy();
    const notFound = debugElement.query(By.css('p'));
    expect(notFound.nativeElement.textContent).toContain('Product not found');
  });

  it('should dispatch update product action on form submit', () => {
    spyOn(store, 'dispatch');
    component.onSubmit();

    expect(store.dispatch).toHaveBeenCalledWith(updateProduct({
      productDto: mockProductDto,
      productCode: mockProduct.id
    }));
  });

  it('should not dispatch update product action on form submit with empty product dto', () => {
    spyOn(store, 'dispatch');
    component.productDto = undefined;
    fixture.detectChanges();

    component.onSubmit();

    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('should bind input fields to productDto', () => {
    component.productDto = mockProductDto;
    fixture.detectChanges();

    const imageInput = debugElement.query(By.css('#image')).nativeElement;
    const titleInput = debugElement.query(By.css('#title')).nativeElement;
    const priceInput = debugElement.query(By.css('#price')).nativeElement;
    const stockInput = debugElement.query(By.css('#stock')).nativeElement;
    const descTextarea = debugElement.query(By.css('#description')).nativeElement;

    expect(imageInput.value).toBe('img');
    expect(titleInput.value).toBe('Test product');
    expect(priceInput.value).toBe('10');
    expect(stockInput.value).toBe('10');
    expect(descTextarea.value).toBe('desc');
  });

  it('should disable form submit button if price is invalid', () => {
    const form: NgForm = debugElement.query(By.directive(NgForm)).injector.get(NgForm);
    form.control.get('price')?.setValue('-5');
    fixture.detectChanges();

    const submitBtn = debugElement.query(By.css('button[type="submit"]')).nativeElement;

    expect(submitBtn.disabled).toBeTrue();
  });

  it('should disable form submit button if stock is invalid', () => {
    const form: NgForm = debugElement.query(By.directive(NgForm)).injector.get(NgForm);
    form.control.get('stock')?.setValue('-5');
    fixture.detectChanges();

    const submitBtn = debugElement.query(By.css('button[type="submit"]')).nativeElement;

    expect(submitBtn.disabled).toBeTrue();
  });

  it('should enable form submit button if form is valid', () => {
    component.productDto = mockProductDto;
    fixture.detectChanges();
    const submitBtn = debugElement.query(By.css('button[type="submit"]')).nativeElement;

    expect(submitBtn.disabled).toBeFalse();
  });
});
