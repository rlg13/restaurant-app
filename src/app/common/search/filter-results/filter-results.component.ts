import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { OrderState } from './../../../model/order-state.enum';
import { Order } from './../../../model/order';
import { OrderStateFilter } from './order-state-filter';

import * as moment from 'moment';

@Component({
  selector: 'app-filter-results',
  templateUrl: './filter-results.component.html',
  styleUrls: ['./filter-results.component.scss'],
  providers: [OrderStateFilter]
})
export class FilterResultsComponent implements OnInit {

  @Input() listOrders: Array<Order>;
  @Output() cancelEvent: EventEmitter<Order> = new EventEmitter<Order>();
  @Output() paidEvent: EventEmitter<Order> = new EventEmitter<Order>();

  constructor(private translator: TranslateService, public orderStateFilter: OrderStateFilter) { }

  ngOnInit(): void {
  }

  cancelOrder(order): void {
    this.cancelEvent.emit(order);
  }
  paidOrder(order): void {
    this.paidEvent.emit(order);
  }

  permitCancel(order: Order): boolean {
    return !!order && !!order.dayToServe && !!order.state
      && moment(order.dayToServe).isAfter(moment().startOf('day')) && order.state === OrderState.RECEIVED;
  }

  permitPaid(order: Order): boolean {
    return !!order && !!order.state && order.state === OrderState.DELIVERED;
  }

}
