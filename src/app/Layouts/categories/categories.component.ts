import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  @ViewChild('dropdown_container') dropdown_container!: ElementRef;
  @ViewChild('logo') logo!: ElementRef;
  @ViewChild('icons') icons!: ElementRef;
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.checkScroll();
  }
  ngAfterViewInit() {
    this.checkScroll();
    if (this.dropdown_container.nativeElement.style.top === '0') {
      console.log('top');
    }
  }
  checkScroll() {
    const rect = this.dropdown_container.nativeElement.getBoundingClientRect();
    if (rect.top <= 0) {
      this.dropdown_container.nativeElement.classList.add('centered');
      this.logo.nativeElement.style.display = 'flex';
      this.icons.nativeElement.style.display = 'flex';
    } else {
      this.dropdown_container.nativeElement.classList.remove('centered');
      this.logo.nativeElement.style.display = 'none';
      this.icons.nativeElement.style.display = 'none';
    }
  }
}
