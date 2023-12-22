import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { COLOR_OBJECT } from 'src/app/store/static-data';

@Component({
  selector: 'app-review-before-adding',
  templateUrl: './review-before-adding.component.html',
  styleUrls: ['./review-before-adding.component.scss']
})
export class ReviewBeforeAddingComponent {
  @ViewChild('box_container') box_container!: ElementRef;
  @ViewChild('category') category!: ElementRef;
  @ViewChild('size') size!: ElementRef;
  @ViewChild('color') colorBox!: ElementRef;
  @ViewChild('boxs') boxs_container!: ElementRef;
  colorObject = COLOR_OBJECT
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.checkScroll();
  }
  myFunction(dropdown: HTMLDivElement) {
    dropdown.classList.toggle('show');
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
      this.category.nativeElement.style.display = 'block';
      this.size.nativeElement.style.display = 'block';
      this.colorBox.nativeElement.style.display = 'block';
    }
  }
}
