import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { CurrencyExchangeRateComponent } from './currency-exchange-rate/currency-exchange-rate.component';
import { HistoricalComponent } from './historical/historical.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: CurrencyExchangeRateComponent
  },
  {
    path: 'historical',
    component: HistoricalComponent
  },
  {
    path: 'courses',
    component: CoursesComponent
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
