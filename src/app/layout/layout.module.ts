import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainLayoutComponent } from './app-layout/main-layout/main-layout.component';
@NgModule({
  declarations: [MainLayoutComponent, HeaderComponent, SidebarComponent],
  imports: [SharedModule],
})
export class LayoutModule {}
