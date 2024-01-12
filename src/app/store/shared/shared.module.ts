import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from 'src/app/Layouts/nav-bar/nav-bar.component';
import { MaterialsModule } from '../materials/materials.module';
import { UserStore } from '../log-in/store';

const modules = [CommonModule, MaterialsModule];

@NgModule({
  declarations: [],
  imports: [...modules],
  exports: [...modules],
  providers: [UserStore],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
