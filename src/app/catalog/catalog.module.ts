import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CategoryListComponent, CategoryFormComponent],
  imports: [CommonModule, CatalogRoutingModule, SharedModule],
})
export class CatalogModule {}
