import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogInComponent } from 'src/app/store/log-in/log-in.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  @ViewChild('dropdown_container') dropdown_container!: ElementRef;
  @ViewChild('logo') logo!: ElementRef;
  @ViewChild('icons') icons!: ElementRef;
  @ViewChild('bag') bag!: ElementRef;
  @ViewChild('iconItem') iconItem!: ElementRef;
  closeClicked = false;
  mouseInBag = false;

  constructor( 
    private el: ElementRef, 
    private renderer: Renderer2, 
    public dialog: MatDialog) {}
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

  
  openDialog(): void {
    const dialogRef = this.dialog.open(LogInComponent, {
      width: '400px',
      height: '426px',
      data: {name: 'this.name', animal: 'this.animal'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
  expandBag() {
    this.renderer.setStyle(this.bag.nativeElement, 'opacity', '1');
    this.bag.nativeElement.classList.add('expanded');
    this.iconItem.nativeElement.classList.add('expanded');
    this.closeClicked = false;
    this.onBagEnter();
  }

  closeBag() {
    this.renderer.setStyle(this.bag.nativeElement, 'opacity', '0');
    this.bag.nativeElement.classList.remove('expanded');
    this.iconItem.nativeElement.classList.remove('expanded');
    this.closeClicked = true;
  }
  onBagEnter() {
    this.mouseInBag = true;
  }

  onBagLeave() {
    this.mouseInBag = false;
    if (this.closeClicked) {
      this.closeBag();
    }
  }


}
