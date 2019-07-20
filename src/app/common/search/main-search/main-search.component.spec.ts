import { registerLocaleData } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import localeEs from '@angular/common/locales/es';

import { ClarityModule } from '@clr/angular';

import { TranslateModule } from '@ngx-translate/core';

import { CreateDishComponent } from './../../detail/create-dish/create-dish.component';
import { DetailOrderComponent } from './../../detail/detail-order/detail-order.component';
import { SelectDishComponent } from './../../detail/select-dish/select-dish.component';
import { FilterResultsComponent } from './../filter-results/filter-results.component';
import { FilterSearchComponent } from './../filter-search/filter-search.component';
import { MainSearchComponent } from './main-search.component';

describe('MainSearchComponent', () => {
  let component: MainSearchComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ClarityModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot()
      ],
      declarations: [
        MainSearchComponent,
        FilterSearchComponent,
        FilterResultsComponent,
        DetailOrderComponent,
        SelectDishComponent,
        CreateDishComponent
      ]
    }).compileComponents();
    registerLocaleData(localeEs);
    component = TestBed.createComponent(MainSearchComponent).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
