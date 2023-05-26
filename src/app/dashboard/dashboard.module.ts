import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [DashboardRoutingModule, SharedModule],
})
export class DashboardModule {}
