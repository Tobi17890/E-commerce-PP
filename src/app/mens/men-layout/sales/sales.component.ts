import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { COLOR_DENIM_OBJECT } from 'src/app/store/static-data';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent {
  @ViewChild('box_container') box_container!: ElementRef;
  @ViewChild('category') category!: ElementRef;
  @ViewChild('size') size!: ElementRef;
  @ViewChild('color') colorBox!: ElementRef;
  @ViewChild('boxs') boxs_container!: ElementRef;
  
  colorObject = COLOR_DENIM_OBJECT;
  color = COLOR_DENIM_OBJECT?.map((item: any) => item.color);
  
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.checkScroll();
  }

  ngAfterViewInit() {
    this.checkScroll();
  }

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

  checkScroll() {
    const rect = this.box_container.nativeElement.getBoundingClientRect();
    if (rect.top <= 110) {
      const boxs = this.boxs_container.nativeElement;
      boxs.style.justifyContent = 'flex-start';
      boxs.style.gap = '20px';
      this.category.nativeElement.style.display = 'none';
      this.size.nativeElement.style.display = 'none';
      this.colorBox.nativeElement.style.display = 'none';
    } else {
      const box = this.category.nativeElement && this.size.nativeElement && this.colorBox.nativeElement;
      box.style.zIndex = '-1';
      this.category.nativeElement.style.display = 'block';
      this.size.nativeElement.style.display = 'block';
      this.colorBox.nativeElement.style.display = 'block';
    }
  }

}
