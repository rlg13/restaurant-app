import { FormGroup, FormControl, FormControlName } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DishType } from 'src/app/model/dish-type.enum';
import { Dish } from 'src/app/model/dish';

@Component({
  selector: 'app-select-dish',
  templateUrl: './select-dish.component.html',
  styleUrls: ['./select-dish.component.scss']
})
export class SelectDishComponent implements OnInit {

  @Input() type: DishType;
  @Input() items: Array<Dish>;
  @Input() labelName: string;
  @Input() form: FormGroup;
  @Input() nameControl: string;
  @Input() itemSelected: Dish;

  @Output() selectDish: EventEmitter<Dish> = new EventEmitter<Dish>();
  @Output() createNewDish: EventEmitter<DishType> = new EventEmitter<DishType>();

  emptyDish: Dish;
  constructor() { }

  ngOnInit() {
    this.emptyDish = new Dish({ type: this.type });
    this.cleanSelect();
  }

  cleanSelect() {
    this.form.patchValue({
      [this.nameControl]: this.emptyDish
    });
  }
  openNewDish() {
    this.createNewDish.emit(this.type);
  }

}
