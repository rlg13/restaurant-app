import { SelectDishComponent } from './../select-dish/select-dish.component';
import { CreateDishComponent } from './../create-dish/create-dish.component';
import { DishType } from './../../../model/dish-type.enum';
import { DishService } from './../../../services/dish.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Dish } from 'src/app/model/dish';

import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Order } from 'src/app/model/order';
import * as moment from 'moment';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.scss']
})
export class DetailOrderComponent implements OnInit {

  @Input() showModal: boolean;
  @ViewChild('newDish', { static: true }) newDish: CreateDishComponent;

  @Output() newOrderEvent: EventEmitter<Order> = new EventEmitter<Order>();

  @ViewChild('fistComponent', { static: true }) fistComponent: SelectDishComponent;
  @ViewChild('secondComponent', { static: true }) secondComponent: SelectDishComponent;
  @ViewChild('dessertComponent', { static: true }) dessertComponent: SelectDishComponent;

  firstDishes: Array<Dish>;
  secondDishes: Array<Dish>;
  desserts: Array<Dish>;
  firstSeletedValue: Dish;
  secondSeletedValue: Dish;
  dessertSeletedValue: Dish;
  orderDay: Date;
  dayToServe: Date;
  formDetalle: FormGroup;

  constructor(private dishService: DishService) { }

  getTypeEnum() {
    return DishType;
  }

  ngOnInit() {
    this.orderDay = moment().toDate();
    this.calculateStimatedDateToServe();
    this.formDetalle = new FormGroup({
      orderDayValue: new FormControl(this.orderDay, [Validators.required])
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
    const dayBefore = moment(this.orderDay).startOf('day');
    if (!this.orderDay || dayBefore.isBefore(moment().startOf('day'))) {
      this.formDetalle.patchValue({
        orderDayValue: ''
      });
      this.dayToServe = null;
    } else {
      this.calculateStimatedDateToServe();

    }
  }

  calculateStimatedDateToServe() {
    const dateToServeClient = moment(this.orderDay);
    if (dateToServeClient.isAfter(moment().endOf('day'))) {
      this.dayToServe = dateToServeClient.startOf('day').toDate();
    } else {
      if (moment().hour() >= 11) {
        this.dayToServe = dateToServeClient.add(1, 'd').startOf('day').toDate();
      } else {
        this.dayToServe = dateToServeClient.startOf('day').toDate();
      }
    }
  }

  cleanInputs() {
    this.orderDay = moment().toDate();
    this.calculateStimatedDateToServe();
    this.firstSeletedValue = this.fistComponent.emptyDish;
    this.secondSeletedValue = this.secondComponent.emptyDish;
    this.dessertSeletedValue = this.dessertComponent.emptyDish;
    this.fistComponent.itemSelected = this.fistComponent.emptyDish;
    this.secondComponent.itemSelected = this.secondComponent.emptyDish;
    this.dessertComponent.itemSelected = this.dessertComponent.emptyDish;
  }

  checkSelectDish(): boolean {
    let returnCheck = true;
    if (this.firstSeletedValue.id === null
      && this.secondSeletedValue.id === null
      && this.dessertSeletedValue.id === null) {
      this.formDetalle.setErrors({ allmostOne: true });
      returnCheck = false;
    } else {
      this.formDetalle.setErrors(null);
    }
    return returnCheck;
  }

  saveOrder() {
    if (!this.checkSelectDish()) {
      return false;
    }

    const newOrderItem: Order = new Order({
      user: new User({ id: localStorage.getItem('userId'), name: localStorage.getItem('user') }),
      dayOrder: this.orderDay,
      firstDish: this.firstSeletedValue,
      secondDish: this.secondSeletedValue,
      dessert: this.dessertSeletedValue
    });
    this.newOrderEvent.emit(newOrderItem);
    this.showModal = false;
  }

  openCreateDish(typeDish: DishType) {
    this.newDish.typeDish = typeDish;
    this.newDish.formCreateDish.patchValue({
      newDishName: ''
    });
    this.newDish.showAddDish = true;
  }

  selectDish(dishSelected: Dish) {
    if (DishType.FIRST === dishSelected.type) {
      this.firstSeletedValue = dishSelected;
    }
    if (DishType.SECOND === dishSelected.type) {
      this.secondSeletedValue = dishSelected;
    }
    if (DishType.DESSERT === dishSelected.type) {
      this.dessertSeletedValue = dishSelected;
    }
    this.checkSelectDish();
  }

  saveDish(newDish: Dish) {
    if (DishType.FIRST === newDish.type) {
      this.firstDishes.push(newDish);
      this.firstSeletedValue = newDish;
      return;
    }
    if (DishType.SECOND === newDish.type) {
      this.secondDishes.push(newDish);
      this.secondSeletedValue = newDish;
      return;
    }
    if (DishType.DESSERT === newDish.type) {
      this.desserts.push(newDish);
      this.dessertSeletedValue = newDish;
      return;
    }
  }
}
