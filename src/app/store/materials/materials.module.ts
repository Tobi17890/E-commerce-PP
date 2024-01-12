import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog'
import {MatRadioModule} from '@angular/material/radio';
import { UserStore } from '../log-in/store';
import {MatProgressBarModule} from '@angular/material/progress-bar';

export class FormFieldOverviewExample {}

@NgModule({
  exports: [
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatRadioModule,
    MatProgressBarModule
  ],
  declarations: [],
  providers: [UserStore],
})
export class MaterialsModule {}
