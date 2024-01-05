import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  onHover() {
    this.renderer.addClass(document.querySelector('ion-icon[name="person-outline"]'), 'hover');
  }

  offHover() {
    this.renderer.removeClass(document.querySelector('ion-icon[name="person-outline"]'), 'hover');
  }
}
