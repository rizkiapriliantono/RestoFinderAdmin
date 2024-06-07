import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNpwpFormat]',
  standalone: true
})
export class NpwpFormatDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    this.el.nativeElement.value = this.autoFormatNPWP(value);
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const maxLength = 20; // Sesuaikan dengan nilai maxlength yang Anda inginkan
    if (this.el.nativeElement.value.length >= maxLength) {
      event.preventDefault();
    }
  }

  autoFormatNPWP(NPWPString: string): string {
    try {
      var cleaned = ("" + NPWPString).replace(/\D/g, "");
      var match = cleaned.match(/(\d{0,2})?(\d{0,3})?(\d{0,3})?(\d{0,1})?(\d{0,3})?(\d{0,3})?$/);
      if (match) {
        return [
          match[1],
          match[2]? ".": "",
          match[2],
          match[3]? ".": "",
          match[3],
          match[4]? ".": "",
          match[4],
          match[5]? "-": "",
          match[5],
          match[6]? ".": "",
          match[6]].join("");
      } else {
        return "";
      }
    } catch(err) {
      return "";
    }
  }
}
