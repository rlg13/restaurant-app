import { DetailOrderComponent } from './../../detail-order/detail-order.component';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Order } from 'src/app/model/order';

@Component({
  selector: 'app-filter-results',
  templateUrl: './filter-results.component.html',
  styleUrls: ['./filter-results.component.scss']
})
export class FilterResultsComponent implements OnInit {

  @ViewChild('detail', {static: true}) detail: DetailOrderComponent;
  @Input() listOrders: Array<Order>;
  constructor() { }

  ngOnInit() {
  }

  openDetail() {
    this.detail.showModal  = true;
    this.detail.create = false;
  }

}
