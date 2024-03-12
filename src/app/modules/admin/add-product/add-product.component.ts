import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { COLOR_OBJECT } from 'src/app/store/static-data';

export interface User {
  name: string;
  brand?: string;
  category?: string;
  unit?: string;
  status?: string;
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
  addProductForm!: FormGroup;

  colorObject = COLOR_OBJECT;

  myControl = new FormControl<string | User>('');
  colorControl = new FormControl<any>('');
  options: User[] = [
    {
      name: 'Mary',
      brand: 'apple',
      category: 'electronics',
      unit: 'kg',
      status: 'active',

    },
    {
      name: 'Shelley',
      brand: 'sumsung',
      category: 'electronics',
      unit: 'mg',
      status: 'closed',
    },
    {
      name: 'Igor',
      brand: 'huawei',
      category: 'electronics',
      unit: 'g',
      status: 'expired',
    },
  ];
  filteredOptions!: Observable<User[]>;

  filteredColors!: Observable<any[]>;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.addProductForm = this.fb.group({});
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        if (value) {
          return typeof value === 'string'
            ? this._filter(value)
            : this._filter(value.name, value.brand) ||
                this._filter(value.name, value.category) ||
                this._filter(value.name, value.unit) ||
                this._filter(value.name, value.status); 
        }
        return this.options;
      })
    );
    this.filteredColors = this.colorControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        return this._filterColor(value);
      }
    ))
  }

  onSubmit() {
    console.log(this.addProductForm.value);
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  displayFnBrand(user: User): string {
    return user && user.brand ? user.brand : '';
  }

  displayFnCategory(user: User): string {
    return user && user.category ? user.category : '';
  }

  displayFnUnit(user: User): string {
    return user && user.unit ? user.unit : '';
  }

  displayFnStatus(user: User): string {
    return user && user.status ? user.status : '';
  }

  displayFnColor(option: any): string {
    return option ? option.name : '';
  }
  
  

  private _filter(
    name: string,
    brand?: string,
    category?: string,
    unit?: string,
    status?: string,
  ): User[] {
    if (name) {
      const filterValue = name.toLowerCase();
      return this.options.filter((option) =>
        option.name.toLowerCase().includes(filterValue)
      );
    }
    if (brand) {
      const filterValue = brand.toLowerCase();
      return this.options.filter((option) =>
        option.brand?.toLowerCase().includes(filterValue)
      );
    }
    if (category) {
      const filterValue = category.toLowerCase();
      return this.options.filter((option) =>
        option.category?.toLowerCase().includes(filterValue)
      );
    }
    if (unit) {
      const filterValue = unit.toLowerCase();
      return this.options.filter((option) =>
        option.unit?.toLowerCase().includes(filterValue)
      );
    }
    if (status) {
      const filterValue = status.toLowerCase();
      return this.options.filter((option) =>
        option.status?.toLowerCase().includes(filterValue)
      );
    }
    return this.options;
  }

  private _filterColor(value: any): any[] {
    const filterValue = value.toLowerCase();
    return this.colorObject.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }
}
