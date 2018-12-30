import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BlockUIModule } from 'ng-block-ui';
import { NgxMaskModule } from 'ngx-mask';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { MessagesComponent } from './components/messages/messages.component';
import { HttpClientModule } from '@angular/common/http';
import { ChartComponent } from './components/chart/chart.component';
import { CriteriaPanelComponent } from './components/criteria-panel/criteria-panel.component';
import { ForecastForMonthComponent } from './components/forecast/forecast-for-month/forecast-for-month.component';
import { ForecastForMonthsComponent } from './components/forecast/forecast-for-months/forecast-for-months.component';
import { AccountListComponent } from './components/account-list/account-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    MessagesComponent,
    CriteriaPanelComponent,
    ForecastForMonthComponent,
    ForecastForMonthsComponent,
    AccountListComponent
  ],
  imports: [
    ChartsModule,
    BlockUIModule.forRoot(),
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
