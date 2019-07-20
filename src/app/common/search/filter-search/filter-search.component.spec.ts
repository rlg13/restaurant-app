import { ReactiveFormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { ClarityModule } from '@clr/angular';
import { TranslateModule } from '@ngx-translate/core';

import { FilterSearchComponent } from './filter-search.component';

describe('FilterSearchComponent', () => {
  let component: FilterSearchComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ClarityModule,
        ReactiveFormsModule,
        TranslateModule.forRoot()],
      declarations: [FilterSearchComponent]
    }).compileComponents();
    component = TestBed.createComponent(FilterSearchComponent).componentInstance;
 });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
