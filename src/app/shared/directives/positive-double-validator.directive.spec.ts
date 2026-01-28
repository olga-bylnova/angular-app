import { PositiveDoubleValidatorDirective } from './positive-double-validator.directive';
import { Component, DebugElement } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

@Component({
  template: `
    <form>
      <input
        type="text"
        name="price"
        [(ngModel)]="price"
        appPositiveDoubleValidator
        #priceModel="ngModel"
      />
    </form>`,
  standalone: true,
  imports: [PositiveDoubleValidatorDirective, FormsModule],
})
class TestHostComponent {
  price: any;
}

describe('PositiveDoubleValidatorDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let debug: DebugElement;
  let element: DebugElement;

  beforeEach((async () => {
    TestBed.configureTestingModule({
      imports: [TestHostComponent]
    });

    fixture = TestBed.createComponent(TestHostComponent);
    debug = fixture.debugElement;
    element = debug.query(By.css('[name=price]'));
    fixture.detectChanges();

    await fixture.whenStable();
  }));

  function setValue(value: any) {
    element.nativeElement.value = value;
    element.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }

  function getControl() {
    const form = debug.query(By.directive(NgForm)).injector.get(NgForm);
    return form.control.get('price');
  }

  it('should create an instance', () => {
    fixture.detectChanges();
    expect(element).toBeTruthy();
  });

  it('should be valid for positive double', () => {
    setValue(5.5);

    const control = getControl();
    expect(control?.valid).toBeTrue();
    expect(control?.errors).toEqual(null);
  });

  it('should be invalid for negative double', () => {
    setValue(-5.5);

    const control = getControl();
    expect(control?.invalid).toBeTrue();
    expect(control?.errors).toEqual({notDoubleValue: {value: '-5.5'}});
  });

  it('should be valid for integer', () => {
    setValue(5);

    const control = getControl();
    expect(control?.valid).toBeTrue();
    expect(control?.errors).toEqual(null);
  });

  it('should be invalid for string', () => {
    setValue('abc');

    const control = getControl();
    expect(control?.invalid).toBeTrue();
    expect(control?.errors).toEqual({notDoubleValue: {value: 'abc'}});
  });

  it('should be valid for null', () => {
    setValue(null);

    const control = getControl();
    expect(control?.valid).toBeTrue();
    expect(control?.errors).toEqual(null);
  });
});
