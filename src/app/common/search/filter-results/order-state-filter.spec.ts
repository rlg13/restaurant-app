import { Injector } from '@angular/core';
import { async } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';

import { of, Observable } from 'rxjs';

import { Order } from './../../../model/order';
import { OrderState } from './../../../model/order-state.enum';
import { OrderStateFilter } from './order-state-filter';

const ORDER: Order = new Order({ id: 2, state: OrderState.DELIVERED });

const TRANSLATIONS = {
  RECEIVED: 'Emitido',
  DELIVERED: 'Servido',
  PAID: 'Pagado',
  CANCELED: 'Cancelado'
};

class TranslateServiceStub {
  public get(key: string): Observable<string> {
    return of(key);
  }

  public instant(key: string): string {
    return TRANSLATIONS[key];
  }
}

describe('OrderStateFilter', () => {
  let injector: Injector;

  beforeEach(async(() => {
    injector = Injector.create({
      providers: [
        {
          provide: OrderStateFilter,
          deps: [TranslateService]
        },
        {
          provide: TranslateService,
          useClass: TranslateServiceStub,
          deps: []
        }
      ]
    });
  }));

  it('should return true when search value is found', () => {
    const VALUE_SEARCH = 'Servido';
    expect(injector.get(OrderStateFilter).accepts(ORDER, VALUE_SEARCH)).toBeTruthy();
  });

  it('should return false when search value is not found', () => {
    const VALUE_SEARCH = 'Emitido';
    expect(injector.get(OrderStateFilter).accepts(ORDER, VALUE_SEARCH)).toBeFalsy();
  });
});