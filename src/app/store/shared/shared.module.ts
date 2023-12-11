import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from 'src/app/Layouts/nav-bar/nav-bar.component';
import { MaterialsModule } from '../materials/materials.module';

const modules = [CommonModule, MaterialsModule];

@NgModule({
  declarations: [],
  imports: [...modules],
  exports: [...modules],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
