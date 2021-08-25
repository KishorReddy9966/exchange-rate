import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyExchangeRateComponent } from './currency-exchange-rate/currency-exchange-rate.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: CurrencyExchangeRateComponent
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
