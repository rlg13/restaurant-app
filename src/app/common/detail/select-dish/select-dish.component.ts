import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DishType } from './../../../model/dish-type.enum';
import { Dish } from './../../../model/dish';

@Component({
  selector: 'app-select-dish',
  templateUrl: './select-dish.component.html',
  styleUrls: ['./select-dish.component.scss']
})
export class SelectDishComponent implements OnInit {

  @Input() type: DishType;
  @Input() dishes: Array<Dish>;
  @Input() labelName: string;
  @Input() form: FormGroup;
  @Input() nameControl: string;
  @Input() itemSelected: Dish;

  @Output() selectDish: EventEmitter<Dish> = new EventEmitter<Dish>();
  @Output() createNewDish: EventEmitter<DishType> = new EventEmitter<DishType>();

  emptyDish: Dish;
  constructor() { }

  ngOnInit(): void {
    this.emptyDish = new Dish({ type: this.type });
    this.cleanSelect();
  }

  cleanSelect(): void {
    this.form.patchValue({
      [this.nameControl]: this.emptyDish
    });
  }
  openNewDish(): void {
    this.createNewDish.emit(this.type);
  }

}
