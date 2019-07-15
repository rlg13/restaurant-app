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
  @Input() control: FormControl;

  @Output() selectDish: EventEmitter<Dish> = new EventEmitter<Dish>();

  //@Input() nameControl: string;
  @Input() itemSelected: Dish;

  emptyDish = new Dish({});
  constructor() { }

  ngOnInit() {
    this.itemSelected = this.emptyDish;
  }

  onChange($event) {
    this.selectDish.emit(this.itemSelected);
  }

}
