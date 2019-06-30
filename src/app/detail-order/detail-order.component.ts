import { DishType } from './../model/dish-type.enum';
import { CreateDishComponent } from './../dish/create-dish/create-dish.component';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Dish } from '../model/dish';
import { DishService } from '../services/dish.service';



@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.scss']
})
export class DetailOrderComponent implements OnInit {

  @Input() create: boolean;
  @Input() showModal: boolean;
  @ViewChild('newDish', { static: true }) newDish: CreateDishComponent;
  //@Output() emitCloseEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  firstDish: Array<Dish>;
  secondDish: Array<Dish>;
  dessert: Array<Dish>;

  constructor(private _dishService: DishService) { }

  getTypeEnum() {
    return DishType;
  }

  ngOnInit() {
    this._dishService.findByType(DishType.FIRST).subscribe(data => {
      this.firstDish = data;
    });
  }


  openNewDish(typeDish: string) {
    this.newDish.typeDish = DishType[typeDish];
    this.newDish.showAddDish = true;
  }
}
