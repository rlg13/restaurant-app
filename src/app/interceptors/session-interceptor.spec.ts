import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { Dish } from './../model/dish';
import { DishType } from './../model/dish-type.enum';
import { DishService } from './../services/dish.service';
import { ConstantsStorage } from './../utils/constants-storage';
import { SessionInterceptor } from './session-interceptor';

class RouterStub {
  public navigate(routes: string[]): void { }
}

describe('SessionInterceptor tests', () => {
  let service: DishService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        DishService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: SessionInterceptor,
          multi: true
        },
        {
          provide: Router,
          useClass: RouterStub,
          deps: []
        }
      ]
    });

    service = TestBed.get(DishService);
    httpMock = TestBed.get(HttpTestingController);
  });


  it('should add header Authorization', () => {
    localStorage.setItem(ConstantsStorage.AUTHORIZATION, 'some value');

    const DISH_TYPE = DishType.FIRST;

    const dummyDish = [
      new Dish({ id: 1, type: DISH_TYPE, name: 'Salad' })
    ];

    const mockResponse = { status: 200, statusText: 'Ok' };

    service.findByType(DISH_TYPE).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const httpRequest = httpMock.expectOne(`${DishService.DISH_TYPE_ENDPOINT}${DISH_TYPE}`);
    expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
    expect(httpRequest.request.method).toEqual('GET');
    httpRequest.flush(dummyDish, mockResponse);
  });

});
