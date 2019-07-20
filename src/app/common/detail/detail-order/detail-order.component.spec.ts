import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ClarityModule } from '@clr/angular';

import { TranslateModule } from '@ngx-translate/core';

import { Observable, of } from 'rxjs';

import { CreateDishComponent } from './../create-dish/create-dish.component';
import { SelectDishComponent } from './../select-dish/select-dish.component';
import { DetailOrderComponent } from './detail-order.component';
import { DishType } from './../../../model/dish-type.enum';
import { Dish } from './../../../model/dish';
import { DishService } from './../../../services/dish.service';
import { LoginService } from './../../../services/login.service';

class DishServiceStub {
  public findByType(dishType: DishType): Observable<Array<Dish>> {
    return of(new Array<Dish>());
  }
}

describe('DetailOrderComponent', () => {
  const DUMMY_DISH: Dish = new Dish({ id: 1, name: 'Salad', type: DishType.FIRST });
  let component: DetailOrderComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ClarityModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        TranslateModule.forRoot()],
      declarations: [DetailOrderComponent, SelectDishComponent, CreateDishComponent],
      providers: [
        LoginService,
        {
          provide: DishService,
          useClass: DishServiceStub,
          deps: []
        }]
    }).compileComponents();
    component = TestBed.createComponent(DetailOrderComponent).componentInstance;
    component.firstComponent =  TestBed.createComponent(SelectDishComponent).componentInstance;
    component.secondComponent =  TestBed.createComponent(SelectDishComponent).componentInstance;
    component.dessertComponent =  TestBed.createComponent(SelectDishComponent).componentInstance;
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve type enum', () => {
    expect(component.getTypeEnum()).toBeTruthy();
  });

  it('should add new dish to array', () => {
    component.ngOnInit();
    component.saveDish(DUMMY_DISH);
    expect(component.firstDishes.length).toBe(1);
    expect(component.secondDishes.length).toBe(0);
    expect(component.desserts.length).toBe(0);
  });

});
