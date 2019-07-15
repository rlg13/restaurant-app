import { DetailOrderComponent } from './common/detail/detail-order/detail-order.component';
import { SessionInterceptor } from './interceptors/session-interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ClarityModule } from '@clr/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateDishComponent } from './common/detail/create-dish/create-dish.component';
import { FilterSearchComponent } from './common/search/filter-search/filter-search.component';
import { FilterResultsComponent } from './common/search/filter-results/filter-results.component';
import { MainSearchComponent } from './common/search/main-search/main-search.component';
import { CreateUserComponent } from './common/login/create-user/create-user.component';
import { MainLoginComponent } from './common/login/main-login/main-login.component';
import { SelectDishComponent } from './common/detail/select-dish/select-dish.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateDishComponent,
    FilterSearchComponent,
    FilterResultsComponent,
    MainSearchComponent,
    CreateUserComponent,
    MainLoginComponent,
    DetailOrderComponent,
    SelectDishComponent
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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]

      }
    })
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: SessionInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
