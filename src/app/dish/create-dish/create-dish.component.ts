import { DishService } from './../../services/dish.service';
import { DishType } from './../../model/dish-type.enum';
import { Component, OnInit, Input } from '@angular/core';
import { Dish } from 'src/app/model/dish';

@Component({
  selector: 'app-create-dish',
  templateUrl: './create-dish.component.html',
  styleUrls: ['./create-dish.component.scss']
})
export class CreateDishComponent implements OnInit {

  @Input() typeDish: DishType;
  @Input() showAddDish: boolean;

  newDishName: string;

  constructor(private _dishService: DishService) { }

  ngOnInit() {
  }

  createDish() {
    console.log( this.typeDish);
    console.log(this.newDishName);
    let newDish = new Dish(0, this.typeDish, this.newDishName);
    console.log(newDish);
    this._dishService.create(DishService.DISH_ENDPOINT, newDish).subscribe(data => {
      //Añadir al vector el valor y dejar como seleccionado.
    });

  }
}
