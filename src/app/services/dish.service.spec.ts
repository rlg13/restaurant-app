import { environment } from './../../environments/environment';
import { DishType } from './../model/dish-type.enum';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DishService } from './dish.service';
import { Dish } from '../model/dish';


describe('DishService', () => {
  let service: DishService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DishService]
    });
    service = TestBed.get(DishService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be return observable<Dish>', () => {
    const DUMMY_DISH = [
      new Dish({ id: 1, type: DishType.FIRST, name: 'Salad' }),
      new Dish({ id: 1, type: DishType.FIRST, name: 'Gazpacho' })
    ];
    

    service.findByType(DishType.FIRST).subscribe(dish => {
      expect(dish.length).toBe(2);
      expect(dish).toEqual(DUMMY_DISH);
    });

    const req = httpMock.expectOne(`${DishService.DISH_TYPE_ENDPOINT}${DishType.FIRST}`);
    expect(req.request.method).toBe('GET');
    req.flush(DUMMY_DISH);
  });

});
