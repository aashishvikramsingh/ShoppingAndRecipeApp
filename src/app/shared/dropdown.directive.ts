import {Directive, HostBinding, HostListener, OnInit} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {

  @HostBinding('class.open') openNow;

  constructor() {
    this.openNow = false;
  }

  ngOnInit() {
    this.openNow = false;
  }

  @HostListener('click') toggleDropdown () {
    this.openNow = !this.openNow;
  }

}
