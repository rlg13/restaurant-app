import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ClarityModule } from '@clr/angular';
import { AngularFontAwesomeModule} from 'angular-font-awesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './common/login/login.component';
import { DetailOrderComponent } from './detail-order/detail-order.component';
import { CreateDishComponent } from './dish/create-dish/create-dish.component';
import { FilterSearchComponent } from './search/filter-search/filter-search.component';
import { FilterResultsComponent } from './search/filter-results/filter-results.component';
import { MainSearchComponent } from './search/main-search/main-search.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DetailOrderComponent,
    CreateDishComponent,
    FilterSearchComponent,
    FilterResultsComponent,
    MainSearchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps:  [HttpClient]

      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
