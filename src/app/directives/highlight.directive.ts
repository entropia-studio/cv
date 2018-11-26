import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  

  constructor(
    private el: ElementRef,    
    ) { }

  @HostListener('mouseenter') onMouseEnter() {    
    this.el.nativeElement.childNodes[1].style.visibility = 'visible';
  }
    
  @HostListener('mouseleave') onMouseLeave() {    
    this.el.nativeElement.childNodes[1].style.visibility = 'hidden';
  }
 
  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;    
  } 

}
