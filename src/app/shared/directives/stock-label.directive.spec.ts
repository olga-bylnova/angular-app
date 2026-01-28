import { StockLabelDirective } from './stock-label.directive';
import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

@Component({
  template: `<appStockLabel [stock]="stock"></appStockLabel>`,
  standalone: true,
  imports: [StockLabelDirective],
})
class TestHostComponent {
  stock?: number;
}

describe('StockLabelDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let element: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestHostComponent]
    });
    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    element = fixture.nativeElement.querySelector('appStockLabel');
  });

  it('should create an instance', () => {
    fixture.detectChanges();
    expect(element).toBeTruthy();
  });

  it('should show "Out of stock" in red when stock is 0', () => {
    hostComponent.stock = 0;
    fixture.detectChanges();

    expect(element.textContent).toEqual('Out of stock');
    expect(element.style.backgroundColor).toBe('red');
  });

  it('should "Almost sold out" in yellow when stock is between 0 and 10', () => {
    hostComponent.stock = 5;
    fixture.detectChanges();

    expect(element.textContent).toEqual('Almost sold out');
    expect(element.style.backgroundColor).toBe('yellow');
  });

  it('should "In stock" in green when stock is more than 10', () => {
    hostComponent.stock = 15;
    fixture.detectChanges();

    expect(element.textContent).toEqual('In stock');
    expect(element.style.backgroundColor).toBe('green');
  });

  it('should update label when stock changes', () => {
    hostComponent.stock = 5;
    fixture.detectChanges();

    expect(element.textContent).toEqual('Almost sold out');

    hostComponent.stock = 15;
    fixture.detectChanges();

    expect(element.textContent).toEqual('In stock');
  });
});
