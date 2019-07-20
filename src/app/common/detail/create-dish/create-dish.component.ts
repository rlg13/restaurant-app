import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { DishType } from './../../../model/dish-type.enum';
import { DishService } from './../../../services/dish.service';
import { Dish } from './../../../model/dish';

@Component({
  selector: 'app-create-dish',
  templateUrl: './create-dish.component.html',
  styleUrls: ['./create-dish.component.scss']
})
export class CreateDishComponent implements OnInit {

  @Input() typeDish: DishType;
  @Input() showAddDish: boolean;
  @Output() newDishCreate: EventEmitter<Dish> = new EventEmitter<Dish>();

  dish: Dish;
  formCreateDish: FormGroup;

  constructor(private dishService: DishService) { }

  ngOnInit(): void {
    this.dish = new Dish({});
    this.formCreateDish = new FormGroup({
      newDishName: new FormControl(this.dish.name, [Validators.required])
    });
  }

  createDish(): void {
    const newDish = new Dish({ type: this.typeDish, name: this.formCreateDish.value.newDishName });
    this.dishService.create(newDish).subscribe(data => {
      this.newDishCreate.emit(data);
      this.showAddDish = false;
    });

  }
}
