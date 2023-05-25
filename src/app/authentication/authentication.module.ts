import { NgModule } from '@angular/core';
import { SigninComponent } from './signin/signin.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [SigninComponent],
  imports: [AuthenticationRoutingModule, SharedModule],
})
export class AuthenticationModule {}
