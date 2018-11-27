import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appNavbarMenu]'
})
export class NavbarMenuDirective implements OnInit{

  @Input() minWidth: number;
  @Input() maxWidth: number;

  constructor(
    private el: ElementRef,
  ) {        
    
  }

  ngOnInit(){
    this.checkTypeOfMenu(window.innerWidth);    
  }


  checkTypeOfMenu(innerWidth: number){
    var condition: boolean = innerWidth > this.minWidth;    
    if (this.maxWidth){
      condition = innerWidth > this.minWidth && innerWidth < this.maxWidth;
    }
    let visibility = this.setVisibility(condition);
    
    this.el.nativeElement.style.display = visibility;
  }

  setVisibility(condition: boolean){
    return condition ? 'flex' : 'none';
  } 
  

  @HostListener('window:resize', ['$event']) onResize(event) {        
    this.checkTypeOfMenu(event.target.innerWidth);    
  }

}
