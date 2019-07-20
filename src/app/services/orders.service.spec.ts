import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { OrdersService } from './orders.service';
import { Dish } from '../model/dish';
import { Order } from '../model/order';
import { User } from '../model/user';
import { OrderState } from '../model/order-state.enum';

describe('OrdersService', () => {
  let service: OrdersService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrdersService]
    });
    service = TestBed.get(OrdersService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be return observable<Order>', () => {
    const DUMMY_ORDER =
      new Order({
        id: 1,
        user: new User({ id: 2, name: 'A name' }),
        state: OrderState.RECEIVED,
        firstDish: new Dish({ id: 2, name: 'Salad' })
      });


    service.create(DUMMY_ORDER).subscribe(order => {
      expect(order.user.name).toEqual('A name');
    });

    const req = httpMock.expectOne(OrdersService.ORDERS_ENDPOINT);
    expect(req.request.method).toBe('POST');
    req.flush(DUMMY_ORDER);
  });
});
