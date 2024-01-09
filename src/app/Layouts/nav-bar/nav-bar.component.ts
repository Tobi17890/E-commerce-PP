import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogInComponent } from 'src/app/store/log-in/log-in.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  @ViewChild('bag') bag!: ElementRef;
  @ViewChild('iconItem') iconItem!: ElementRef;
  closeClicked = false;
  mouseInBag = false;
  constructor( 
    private el: ElementRef, 
    private renderer: Renderer2, 
    public dialog: MatDialog) {}

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
