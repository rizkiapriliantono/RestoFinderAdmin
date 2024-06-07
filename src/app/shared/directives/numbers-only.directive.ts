import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[numbers-only]',
  standalone: true
})
export class NumbersOnlyDirective {
  constructor() {}

  @HostListener('keydown', ['$event']) onKeyDown(e: KeyboardEvent) {
    if (
      [46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) > -1 ||
      // allow Ctrl+A
      (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
      // allow Ctrl+C
      (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
      // allow Ctrl+X
      (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
      // allow home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)
    ) {
      return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  }
}
