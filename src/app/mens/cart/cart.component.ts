import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { doc, getDoc } from 'firebase/firestore';
import { DataService } from 'src/app/store/shared/services/data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  productId: string = '';
  productData: any; 
  constructor(private router: ActivatedRoute, private db: DataService) {
  }

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
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
