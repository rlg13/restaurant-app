import { User } from './../model/user';
import { Order } from './../model/order';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DishType } from './../model/dish-type.enum';
import { CreateDishComponent } from './../dish/create-dish/create-dish.component';
import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { Dish } from '../model/dish';
import { DishService } from '../services/dish.service';
import * as moment from 'moment';



@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.scss']
})
export class DetailOrderComponent implements OnInit {

  @Input() create: boolean;
  @Input() showModal: boolean;
  @ViewChild('newDish', { static: true }) newDish: CreateDishComponent;

  @Output() newOrderEvent: EventEmitter<Order> = new EventEmitter<Order>();

  emptyDish = new Dish({});
  firstDishes: Array<Dish>;
  secondDishes: Array<Dish>;
  desserts: Array<Dish>;
  firstSeletedValue: Dish;
  secondSeletedValue: Dish;
  dessertSeletedValue: Dish;
  orderDay: Date;

  formDetalle: FormGroup;
  constructor(private dishService: DishService) { }

  getTypeEnum() {
    return DishType;
  }

  ngOnInit() {
    this.orderDay = moment().toDate();
    this.formDetalle = new FormGroup({
      orderDayValue: new FormControl(this.orderDay, [Validators.required]),
      firstSeletedValue: new FormControl(this.firstSeletedValue, []),
      secondSeletedValue: new FormControl(this.secondSeletedValue, []),
      dessertSeletedValue: new FormControl(this.dessertSeletedValue, []),
    });
    this.dishService.findByType(DishType.FIRST).subscribe(data => {
      this.firstDishes = data;
    });
    this.dishService.findByType(DishType.SECOND).subscribe(data => {
      this.secondDishes = data;
    });
    this.dishService.findByType(DishType.DESSERT).subscribe(data => {
      this.desserts = data;
    });
  }

  checkDates() {
    if (!this.orderDay) {
      this.formDetalle.patchValue({
        orderDayValue: ''
      });
    }
  }

  cleanInputs() {
    this.formDetalle.patchValue({
      orderDayValue: moment().format('L'),
      firstSeletedValue: this.emptyDish,
      secondSeletedValue: this.emptyDish,
      dessertSeletedValue: this.emptyDish

    });
  }

  saveOrder() {
    const newOrderItem: Order = new Order({
      user: new User({ id: localStorage.getItem('userId'), name: localStorage.getItem('user') }),
      dayOrder: this.orderDay,
      firstDish: this.formDetalle.controls['firstSeletedValue'].value,
      secondDish: this.formDetalle.controls['secondSeletedValue'].value,
      dessert: this.formDetalle.controls['dessertSeletedValue'].value
    });

    this.newOrderEvent.emit(newOrderItem);
    this.showModal = false;




  }

  openNewDish(typeDish: string) {
    this.newDish.typeDish = DishType[typeDish];
    this.newDish.formCreateDish.patchValue({
      newDishName: ''
    });

    this.newDish.showAddDish = true;
  }

  saveDish(newDish: Dish) {
    if (DishType.FIRST === newDish.type) {
      this.firstDishes.push(newDish);
      this.formDetalle.patchValue({
        firstSeletedValue: newDish
      });
      return;
    }
    if (DishType.SECOND === newDish.type) {
      this.secondDishes.push(newDish);
      this.formDetalle.patchValue({
        secondSeletedValue: newDish
      });
      return;
    }
    if (DishType.DESSERT === newDish.type) {
      this.desserts.push(newDish);
      this.formDetalle.patchValue({
        dessertSeletedValue: newDish
      });
      return;
    }
  }
}
