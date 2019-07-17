import { AlmostOneDishValidator } from './almost-one-dish-validator';
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
      orderDayValue: new FormControl(this.orderDay, [Validators.required]),
      firstSeletedValue: new FormControl(this.fistComponent.emptyDish, []),
      secondSeletedValue: new FormControl(this.secondComponent.emptyDish, []),
      dessertSeletedValue: new FormControl(this.dessertComponent.emptyDish, [])
    });
    this.formDetalle.setValidators(AlmostOneDishValidator);

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
    const now = moment();
    const isToday = dateToServeClient.isSame(now, 'day');
    const isTodayBeforeEleven = isToday && now.isBefore('11', 'hour');
    if (!isToday || isTodayBeforeEleven) {
      this.dayToServe = dateToServeClient.startOf('day').toDate();
      return;
    }

    this.dayToServe = dateToServeClient.add(1, 'd').startOf('day').toDate();
  }

  cleanInputs() {
    this.orderDay = moment().toDate();
    this.calculateStimatedDateToServe();
    this.fistComponent.cleanSelect();
    this.secondComponent.cleanSelect();
    this.dessertComponent.cleanSelect();
  }
  /*
    checkSelectDish(): boolean {
      const isSelectedAlmostOne = this.firstSeletedValue.isValid ||
        this.secondSeletedValue.isValid ||
        this.dessertSeletedValue.isValid;
  
  
      if (isSelectedAlmostOne) {
        this.formDetalle.setErrors(null);
        return true;
      }
  
      this.formDetalle.setErrors({ allmostOne: true });
      return false;
    }
  */
  saveOrder() {
    /*   if (!this.checkSelectDish()) {
         return false;
       }*/

    const newOrderItem: Order = new Order({
      user: new User({ id: localStorage.getItem('userId'), name: localStorage.getItem('user') }),
      dayOrder: this.orderDay,
      firstDish: this.formDetalle.get(['firstSeletedValue']).value,
      secondDish: this.formDetalle.get(['secondSeletedValue']).value,
      dessert: this.formDetalle.get(['dessertSeletedValue']).value,
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
  /*
    selectDish(dishSelected: Dish) {
      if (dishSelected.isFirst) {
        this.firstSeletedValue = dishSelected;
      }
  
      if (dishSelected.isSecond) {
        this.secondSeletedValue = dishSelected;
      }
  
      if (dishSelected.isDessert) {
        this.dessertSeletedValue = dishSelected;
      }
      this.checkSelectDish();
    }*/

  saveDish(newDish: Dish) {
    if (newDish.isFirst) {
      this.firstDishes.push(newDish);
      this.formDetalle.patchValue({ firstSeletedValue: newDish });
      return;
    }

    if (newDish.isSecond) {
      this.secondDishes.push(newDish);
      this.formDetalle.patchValue({ secondSeletedValue: newDish });
      return;
    }

    if (newDish.isDessert) {
      this.desserts.push(newDish);
      this.formDetalle.patchValue({ dessertSeletedValue: newDish });
      return;
    }
  }
}
