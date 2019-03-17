import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component'
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { MarketComponent } from './market/market.component';
import { OkComponent } from './ok/ok.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'logIn', component: LogInComponent },
  { path: 'reg', component: RegisterComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'market', component: MarketComponent },
  { path: 'ok', component: OkComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
