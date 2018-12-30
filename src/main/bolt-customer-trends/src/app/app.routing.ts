import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForecastForMonthComponent } from './components/forecast/forecast-for-month/forecast-for-month.component';
import { ForecastForMonthsComponent } from './components/forecast/forecast-for-months/forecast-for-months.component';

const routes: Routes = [
  { path: '', redirectTo: 'startup', pathMatch: 'full' },
  { path: 'forecast-for-month', component: ForecastForMonthComponent },
  { path: 'forecast-for-months', component: ForecastForMonthsComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
