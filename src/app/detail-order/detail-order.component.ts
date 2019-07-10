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
  dayToServe: Date;
  errorCheckDish: boolean = false;

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
    const  dayBefore = moment(this.orderDay).startOf('day');
    if (!this.orderDay || dayBefore.isBefore(moment().startOf('day'))) {
      this.formDetalle.patchValue({
        orderDayValue: ''
      });
      this.dayToServe = null;
    } else {
     this.calculateStimatedDateToServe();

    }
  }

  calculateStimatedDateToServe(){
    const  dateToServeClient = moment(this.orderDay);
    if (dateToServeClient.isAfter(moment().endOf('day'))) {
      this.dayToServe = dateToServeClient.startOf('day').toDate();
    } else {
      if (moment().hour() >= 11) {
        this.dayToServe = dateToServeClient.add(1,'d').startOf('day').toDate();
      } else {
        this.dayToServe = dateToServeClient.startOf('day').toDate();
      }
    }
  }

  cleanInputs() {
    this.orderDay = moment().toDate();
    this.calculateStimatedDateToServe();
    this.formDetalle.patchValue({
      orderDayValue: this.orderDay,
      firstSeletedValue: this.emptyDish,
      secondSeletedValue: this.emptyDish,
      dessertSeletedValue: this.emptyDish

    });
  }

  checkSelectDish(): boolean {
    let returnCheck = true;
    if (this.formDetalle.controls['firstSeletedValue'].value === this.emptyDish
      && this.formDetalle.controls['secondSeletedValue'].value === this.emptyDish
      && this.formDetalle.controls['dessertSeletedValue'].value === this.emptyDish) {
      this.formDetalle.setErrors({ allmostOne: true });
      returnCheck = false;
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
