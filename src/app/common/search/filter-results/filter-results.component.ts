import { OrderState } from '../../../model/order-state.enum';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Order } from 'src/app/model/order';
import { ClrDatagridStringFilterInterface } from '@clr/angular';
import * as moment from 'moment';

class OrderStateFilter implements ClrDatagridStringFilterInterface<Order> {
  constructor(private transtate: TranslateService) { }

  accepts(order: Order, search: string): boolean {
    const orderTranslate: string = this.transtate.instant(order.state);
    return (orderTranslate.toLowerCase().indexOf(search.toLowerCase())) >= 0;

  }
}

@Component({
  selector: 'app-filter-results',
  templateUrl: './filter-results.component.html',
  styleUrls: ['./filter-results.component.scss']
})
export class FilterResultsComponent implements OnInit {


  @Input() listOrders: Array<Order>;

  protected orderStateFilter: OrderStateFilter;

  constructor(private translator: TranslateService) { }

  ngOnInit() {
    this.orderStateFilter = new OrderStateFilter(this.translator);
  }

  cancelOrder(order) {
    return;
  }
  paidOrder(order) {
    return;
  }

  permitCancel(order: Order) {
    return !!order && !!order.dayToServe && !!order.state
      && moment(order.dayToServe).isAfter(moment().startOf('day')) && order.state === OrderState.RECEIVED;
  }

  permitPaid(order: Order) {
    return !!order && !!order.state && order.state === OrderState.DELIVERED;
  }
}