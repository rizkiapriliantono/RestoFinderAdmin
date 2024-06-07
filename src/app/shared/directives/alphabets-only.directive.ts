import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[alphabets-only]',
  standalone: true
})
export class AlphabetsOnlyDirective {
  private allowed: RegExp = new RegExp(/^[a-z A-Z]+$/);

  constructor() {}

  @HostListener('keydown', ['$event']) onKeyDown(e: KeyboardEvent) {
    if (!String(e.key).match(this.allowed)) e.preventDefault();
  }

  @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) { 
    e.preventDefault();
  }
}
