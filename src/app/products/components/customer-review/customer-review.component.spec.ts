import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerReviewComponent } from './customer-review.component';

describe('CustomerReviewComponent', () => {
  let component: CustomerReviewComponent;
  let fixture: ComponentFixture<CustomerReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerReviewComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CustomerReviewComponent);
    component = fixture.componentInstance;
    component.review = {id: 1, name: "Product review", rate: 1.2, text: "Review text"};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display review details', () => {
    expect(fixture.nativeElement.querySelectorAll('span')[0].textContent).toBe(component.review.name);
    expect(fixture.nativeElement.querySelectorAll('span')[1].textContent).toBe(component.review.rate?.toString());
    expect(fixture.nativeElement.querySelector('p').textContent).toBe(component.review.text);
  });

  it('should display review rate as 0 if it is undefined', () => {
    component.review.rate = undefined;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('span')[1].textContent).toEqual('0');
  });
});
