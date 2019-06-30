import { CreateDishComponent } from './../dish/create-dish/create-dish.component';
import { Component, OnInit, Input, ViewChild } from '@angular/core';


@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.scss']
})
export class DetailOrderComponent implements OnInit {

  @Input() create: boolean;
  @Input() showModal: boolean;
  @ViewChild('newDish', {static: true}) newDish: CreateDishComponent;
  //@Output() emitCloseEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  
  constructor() { }

  ngOnInit() {
  }

  
  openNewDish(typeDish: string ){
    this.newDish.typeDish = typeDish;
    this.newDish.showAddDish = true;
  }

 /* emitClose() {
    this.showModal = false;
    this.emitCloseEvent.emit(false);
  }*/

}
