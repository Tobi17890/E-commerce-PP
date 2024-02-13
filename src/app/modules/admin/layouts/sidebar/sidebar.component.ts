import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('dropdownAnimation', [
      state(
        'hidden',
        style({
          opacity: 0,
          transform: 'translateY(-20px)',
          height: '0px',
          overflow: 'hidden',
        })
      ),
      state(
        'visible',
        style({
          opacity: 1,
          transform: 'translateY(0)',
          height: '*',
          overflow: 'hidden',
        })
      ),
      transition('hidden => visible', animate('200ms ease-in')),
      transition('visible => hidden', animate('200ms ease-out')),
    ]),
  ],
})
export class SidebarComponent {
  showDropdown = false;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
  get dropdownState() {
    return this.showDropdown ? 'visible' : 'hidden';
  }
  setActive(event: MouseEvent) {
    let aElements = document.querySelectorAll('.dropdown-menu a');
    aElements.forEach((a) => a.classList.remove('active'));
    (event.target as Element).classList.add('active');
    event.stopPropagation();
  }
  
}
