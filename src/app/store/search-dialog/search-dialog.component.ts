import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss']
})
export class SearchDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SearchDialogComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private auth: AuthService,
    private router : Router
  ) {
  }

  onClosedialog(): void {
    this.dialogRef.close();
  }
}
