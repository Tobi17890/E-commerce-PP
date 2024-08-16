import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { doc, getDoc } from 'firebase/firestore';
import { UserStoreService } from 'src/app/shared/user-store.service';
import { DataService } from 'src/app/store/shared/services/data.service';

@Component({
  selector: 'app-review-before-adding',
  templateUrl: './review-before-adding.component.html',
  styleUrls: ['./review-before-adding.component.scss'],
})
export class ReviewBeforeAddingComponent {
  productId: string = '';
  productData: any; // Variable to hold the product data
  images: any[] = [];
  isSwitchColor: boolean = false;
  alternateId: string = '5HspUXzIO8J97Cov03mt';
  staticId: string = 'w78WjRzH4NE3CXT119Ut';
  isStaticColorSwitch: boolean = false;
  isAlternateSwitch: boolean = false;
  staticImageForSwitch: any[] = [

  ]
  selectedColor: string | null = null;
  selectedSize: string | null = null;
  constructor(private route: ActivatedRoute, private db: DataService) {} // Inject your data service

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = params['id'];
      this.fetchProductDetails(this.productId);
    });
  }
  onSwitchColor(id: string) {
    // this.isSwitchColor = !this.isSwitchColor;
    this.fetchProductDetails(id);
  }
  async fetchProductDetails(id: string) {
    const docRef = doc(this.db.productRef(), id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      this.productData = docSnap.data();
      console.log('Document data:', this.productData?.productImages);
      this.images = this.productData?.productImages;
      if (this.productData?.colors && this.productData.colors.length > 0) {
        if (this.isStaticColorSwitch && this.productData.colors.length > 1) {
          // Select the second color for onHandleSwitchColor
          this.selectColor(this.productData.colors[1].color);
        } else {
          // Select the first color for normal cases
          this.selectColor(this.productData.colors[0].color);
        }
        this.isStaticColorSwitch = false;
      }
    } else {
      console.log("No such document!");
    }
  }
  selectColor(color: string) {
    this.selectedColor = color;
    this.isSwitchColor = true;
  }
  onHandleSwitchColor() {
    if (!this.isAlternateSwitch) {
      // First click: switch to static ID and select second color
      this.isStaticColorSwitch = true;
      this.isAlternateSwitch = true;
      this.fetchProductDetails(this.staticId);
    } else {
      // Second click: switch to alternate ID and select first color
      this.isStaticColorSwitch = false;
      this.isAlternateSwitch = false;
      this.fetchProductDetails(this.alternateId);
    }
  }
  selectSize(size: string) {
    this.selectedSize = size;
  }

  isColorSelected(color: string): boolean {
    return this.selectedColor === color;
  }

  isSizeSelected(size: string): boolean {
    return this.selectedSize === size;
  }
}
