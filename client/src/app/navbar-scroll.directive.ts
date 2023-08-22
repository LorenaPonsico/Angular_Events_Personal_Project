import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appNavbarScroll]'
})
export class NavbarScrollDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    if (window.scrollY > 0) {
      this.renderer.addClass(this.el.nativeElement, 'navbar-white-bg');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'navbar-white-bg');
    }
  }
}
