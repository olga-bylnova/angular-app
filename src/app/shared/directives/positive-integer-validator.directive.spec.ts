import { PositiveIntegerValidatorDirective } from './positive-integer-validator.directive';
import { Component, DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { FormsModule, NgForm } from "@angular/forms";

@Component({
  template: ` <form>
    <input
      type="text"
      name="stock"
      [(ngModel)]="stock"
      appPositiveIntegerValidator
      #stockModel="ngModel"
    />
  </form>`,
  standalone: true,
  imports: [PositiveIntegerValidatorDirective, FormsModule],
})
class TestHostComponent {
  stock: any;
}

describe('PositiveIntegerValidatorDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let element: DebugElement;
  let debug: DebugElement;

  beforeEach((async () => {
    TestBed.configureTestingModule({
      imports: [TestHostComponent]
    });

    fixture = TestBed.createComponent(TestHostComponent);
    debug = fixture.debugElement;
    element = debug.query(By.css('[name=stock]'));
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
    return form.control.get('stock');
  }

  it('should create an instance', () => {
    fixture.detectChanges();
    expect(element).toBeTruthy();
  });

  it('should be valid for positive integer', async () => {
    setValue(10);
    let control = getControl();

    expect(control?.valid).toBeTrue();
    expect(control?.errors).toEqual(null);
  });

  it('should be invalid for negative integer', async () => {
    setValue(-10);
    let control = getControl();

    expect(control?.invalid).toBeTrue();
    expect(control?.errors).toEqual({
      notIntegerValue: { value: '-10' },
    });
  });

  it('should be invalid for double value', async () => {
    setValue(5.5);
    let control = getControl();

    expect(control?.invalid).toBeTrue();
    expect(control?.errors).toEqual({
      notIntegerValue: { value: '5.5' },
    });
  });

  it('should be invalid string', async () => {
    setValue('abc');
    let control = getControl();

    expect(control?.invalid).toBeTrue();
    expect(control?.errors).toEqual({
      notIntegerValue: { value: 'abc' },
    });
  });

  it('should be valid empty value', async () => {
    setValue(null);
    let control = getControl();

    expect(control?.valid).toBeTrue();
    expect(control?.errors).toEqual(null);
  });
});
