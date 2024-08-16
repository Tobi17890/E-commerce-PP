import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { DataService } from '../shared/services/data.service';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss']
})
export class SearchDialogComponent implements OnInit {
  productId: string = '';
  productData: any;
  searchForm: FormGroup;
  searchResults: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<SearchDialogComponent>,
    private fb: FormBuilder,
    private auth: AuthService,
    private route: ActivatedRoute,
    private db: DataService,
    private router: Router
  ) {
    this.searchForm = this.fb.group({
      searchTerm: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = params['id'];
      this.fetchProductDetails(this.productId);
    });

    this.searchForm.get('searchTerm')?.valueChanges.subscribe(term => {
      if (term) {
        this.searchProducts(term);
      } else {
        this.searchResults = [];
      }
    });
  }

  onClosedialog(): void {
    this.dialogRef.close();
  }

  async fetchProductDetails(id: string) {
    const docRef = doc(this.db.productRef(), id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      this.productData = docSnap.data();
      console.log(this.productData);
    } else {
      console.log("No such document!");
    }
  }

  async searchProducts(term: string) {
    const productsRef = this.db.productRef(); // This already refers to the 'products' collection
    const titleQuery = query(productsRef, where('productName', '>=', term), where('productName', '<=', term + '\uf8ff'));
  
    const [titleSnapshot] = await Promise.all([
      getDocs(titleQuery),
    ]);
  
    const titleResults = titleSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
    this.searchResults = [...new Set([...titleResults])];
  }
  navigateToProductReview(product: any) {
    console.log(product, 'hi');
    this.dialogRef.close(); // Close the search dialog
    // Navigate to the product review page with the product data
    this.router.navigate(['reviews', product]);
  }
}