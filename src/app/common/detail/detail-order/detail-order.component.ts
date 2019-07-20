
import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AlmostOneDishValidator } from './almost-one-dish-validator';
import { SelectDishComponent } from './../select-dish/select-dish.component';
import { CreateDishComponent } from './../create-dish/create-dish.component';
import { Dish } from './../../../model/dish';
import { DishType } from './../../../model/dish-type.enum';
import { Order } from './../../../model/order';
import { User } from './../../../model/user';
import { DishService } from './../../../services/dish.service';
import { ConstantsStorage } from './../../../utils/constants-storage';
import { Constants } from './../utils/constants';

import * as moment from 'moment';


@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.scss']
})

export class DetailOrderComponent implements OnInit {
  @Input() showModal: boolean;
  @ViewChild('newDish', { static: true }) newDish: CreateDishComponent;

  @Output() newOrderEvent: EventEmitter<Order> = new EventEmitter<Order>();

  @ViewChild('firstComponent', { static: true }) firstComponent: SelectDishComponent;
  @ViewChild('secondComponent', { static: true }) secondComponent: SelectDishComponent;
  @ViewChild('dessertComponent', { static: true }) dessertComponent: SelectDishComponent;

  firstDishes: Array<Dish>;
  secondDishes: Array<Dish>;
  desserts: Array<Dish>;
  orderDay: Date;
  dayToServe: Date;
  detailForm: FormGroup;

  constructor(private dishService: DishService) { }

  getTypeEnum(): typeof DishType {
    return DishType;
  }

  ngOnInit(): void {
    this.orderDay = moment().toDate();
    this.calculateStimatedDateToServe();
    this.detailForm = new FormGroup({
      orderDayValue: new FormControl(this.orderDay, [Validators.required]),
      firstSeletedValue: new FormControl(this.firstComponent.emptyDish, []),
      secondSeletedValue: new FormControl(this.secondComponent.emptyDish, []),
      dessertSeletedValue: new FormControl(this.dessertComponent.emptyDish, [])
    });
    this.detailForm.setValidators(AlmostOneDishValidator);

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

  checkDates(): void {
    const dayBefore = moment(this.orderDay).startOf('day');
    if (!this.orderDay || dayBefore.isBefore(moment().startOf('day'))) {
      this.detailForm.patchValue({
        orderDayValue: ''
      });
      this.dayToServe = null;
    } else {
      this.calculateStimatedDateToServe();
    }
  }

  calculateStimatedDateToServe(): void {
    const dateToServeClient = moment(this.orderDay);
    const now = moment();
    const isToday = dateToServeClient.isSame(now, 'day');
    const isTodayBeforeEleven = isToday && now.isBefore(Constants.ELEVEN, 'hour');
    if (!isToday || isTodayBeforeEleven) {
      this.dayToServe = dateToServeClient.startOf('day').toDate();
      return;
    }
    this.dayToServe = dateToServeClient.add(1, 'd').startOf('day').toDate();
  }

  cleanInputs(): void {
    this.orderDay = moment().toDate();
    this.calculateStimatedDateToServe();
    this.firstComponent.cleanSelect();
    this.secondComponent.cleanSelect();
    this.dessertComponent.cleanSelect();
  }

  saveOrder(): void {
    const newOrderItem: Order = new Order({
      user: new User({ id: localStorage.getItem(ConstantsStorage.USER_ID), name: localStorage.getItem(ConstantsStorage.USER) }),
      dayOrder: this.orderDay,
      firstDish: this.detailForm.get([Constants.FIRST_DISH]).value,
      secondDish: this.detailForm.get([Constants.SECOND_DISH]).value,
      dessert: this.detailForm.get([Constants.DESSERT]).value,
    });
    this.newOrderEvent.emit(newOrderItem);
    this.showModal = false;
  }

  openCreateDish(typeDish: DishType): void {
    this.newDish.typeDish = typeDish;
    this.newDish.formCreateDish.patchValue({
      newDishName: ''
    });
    this.newDish.showAddDish = true;
  }

  saveDish(newDish: Dish): void {
    if (newDish.isFirst) {
      this.firstDishes.push(newDish);
      this.detailForm.patchValue({ firstSeletedValue: newDish });
      return;
    }

    if (newDish.isSecond) {
      this.secondDishes.push(newDish);
      this.detailForm.patchValue({ secondSeletedValue: newDish });
      return;
    }

    if (newDish.isDessert) {
      this.desserts.push(newDish);
      this.detailForm.patchValue({ dessertSeletedValue: newDish });
      return;
    }
  }
}
