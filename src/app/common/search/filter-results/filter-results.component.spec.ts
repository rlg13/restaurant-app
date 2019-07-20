import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ClarityModule } from '@clr/angular';

import { TranslateModule } from '@ngx-translate/core';

import { FilterResultsComponent } from './filter-results.component';
import { Order } from '../../../model/order';
import { OrderState } from '../../../model/order-state.enum';

describe('FilterResultsComponent', () => {

  const ORDER_DELIVERED: Order = ({ id: 1, dayOrder: new Date(), dayToServe: new Date(), state: OrderState.DELIVERED });
  const ORDER_RECEIVED: Order = ({ id: 1, dayOrder: new Date(), dayToServe: new Date(), state: OrderState.RECEIVED });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ClarityModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        TranslateModule.forRoot()],
      declarations: [FilterResultsComponent]
    }).compileComponents();
  });

  it('should be permit paid order', () => {
    const component = TestBed.createComponent(FilterResultsComponent).componentInstance;
    expect(component.permitPaid(ORDER_DELIVERED)).toBe(true);
  });
  it('should not  be permit paid', () => {
    const component = TestBed.createComponent(FilterResultsComponent).componentInstance;
    expect(component.permitPaid(ORDER_RECEIVED)).toBe(false);
  });


  it('should not be permit cancel order', () => {
    const component = TestBed.createComponent(FilterResultsComponent).componentInstance;
    expect(component.permitCancel(ORDER_DELIVERED)).toBe(false);
  });
  it('should be cancel order', () => {
    const component = TestBed.createComponent(FilterResultsComponent).componentInstance;
    expect(component.permitCancel(ORDER_RECEIVED)).toBe(true);
  });
});
