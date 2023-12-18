import { Component } from '@angular/core';
import { COLOR_DENIM_OBJECT } from 'src/app/store/static-data';

@Component({
  selector: 'app-acessories',
  templateUrl: './acessories.component.html',
  styleUrls: ['./acessories.component.scss']
})
export class AcessoriesComponent {
  colorObject = COLOR_DENIM_OBJECT;
  color = COLOR_DENIM_OBJECT?.map((item: any) => item.color);
  isHovering = false;
  ngOnInit(): void {
    this.setupOnClickEvent();
  }

  myFunction(dropdown: HTMLDivElement) {
    dropdown.classList.toggle('show');
  }

  setupOnClickEvent(): void {
    window.onclick = (event: any) => {
      if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName('dropdown-content');
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
    };
  }

  onMouseOver() {
    this.isHovering = true;
  }

  onMouseOut() {
    this.isHovering = false;
  }
}
