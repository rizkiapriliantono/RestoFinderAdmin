import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appAlphanumeric]',
  standalone: true
})
export class AlphanumericDirective {

  constructor() { }

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const input = event.target;
    const regex = /[^a-zA-Z0-9\s]/g; // Tambahkan \s untuk menyertakan spasi
    input.value = input.value.replace(regex, '');
  }
}
