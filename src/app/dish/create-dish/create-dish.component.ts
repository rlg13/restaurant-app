import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-create-dish',
  templateUrl: './create-dish.component.html',
  styleUrls: ['./create-dish.component.scss']
})
export class CreateDishComponent implements OnInit {

  @Input() typeDish: string;
  @Input() showAddDish: boolean;
  

  constructor() { }

  ngOnInit() {
  }

}
