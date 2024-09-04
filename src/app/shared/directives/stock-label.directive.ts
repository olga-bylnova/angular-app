import { Directive, Input, ElementRef, OnChanges, SimpleChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: 'appStockLabel',
  standalone: true
})
export class StockLabelDirective implements OnChanges {
  @Input() stock!: number | undefined;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['stock']) {
      this.updateStockLabel();
    }
  }

  updateStockLabel() {
    let color = '';
    let text = '';
    if (this.stock !== undefined) {
      if (this.stock === 0) {
        color = 'red';
        text = 'Out of stock';
      } else if (this.stock > 0 && this.stock < 10) {
        color = 'yellow';
        text = 'Almost sold out';
      } else {
        color = 'green';
        text = 'In stock';
      }
      this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', color);
      this.renderer.setProperty(this.el.nativeElement, 'textContent', text);
    }
  }
}
