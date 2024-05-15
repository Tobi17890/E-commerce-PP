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
  
  constructor(private route: ActivatedRoute, private db: DataService) {} // Inject your data service

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = params['id'];
      this.fetchProductDetails(this.productId);
    });
  }

  async fetchProductDetails(id: string) {
    const docRef = doc(this.db.productRef(), id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      this.productData = docSnap.data(); // Assign the fetched data to productData
      console.log(this.productData)
    } else {
      console.log("No such document!");
    }
  }
}
