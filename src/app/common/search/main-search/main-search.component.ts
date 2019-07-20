import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild, LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';

import { FilterOrderParams } from './../filter-search/filter-order-params';
import { DetailOrderComponent } from './../../detail/detail-order/detail-order.component';
import { Order } from './../../../model/order';
import { OrderState } from './../../../model/order-state.enum';
import { LoginService } from './../../../services/login.service';
import { OrdersService } from './../../../services/orders.service';
import { ConstantsStorage } from './../../../utils/constants-storage';
import { ConstantsRouter } from './../../../utils/constants-router';

import * as moment from 'moment';

@Component({
  selector: 'app-main-search',
  providers: [
    LoginService,
    { provide: LOCALE_ID, useValue: 'es' }
  ],
  templateUrl: './main-search.component.html',
  styleUrls: ['./main-search.component.scss']
})
export class MainSearchComponent implements OnInit {

  public user: string;

  public opened: boolean;
  public orderDay: Date;
  public firstsOptions: string;
  public secondsOptions: string;
  public dessertsOptions: string;

  public listOrders: Array<Order> = new Array<Order>();

  constructor(private serviceLogin: LoginService, private serviceOrder: OrdersService, private router: Router) { }

  @ViewChild('detail', { static: true }) detail: DetailOrderComponent;

  ngOnInit(): void {
    this.serviceLogin.checkCredentials();
    this.user = this.serviceLogin.getUsername();
    this.detail.showModal = false;
  }

  logout(): void {
    const params: HttpParams = new HttpParams().set('id', localStorage.getItem(ConstantsStorage.USER_ID));
    this.serviceLogin.logout(params).subscribe(data => {
      localStorage.removeItem(ConstantsStorage.AUTHORIZATION);
      localStorage.removeItem(ConstantsStorage.USER_ID);
      localStorage.removeItem(ConstantsStorage.USER);
      this.router.navigate([ConstantsRouter.LOGIN]);
    });
  }

  openCreateOrder(): void {
    this.detail.cleanInputs();
    this.detail.showModal = true;
  }

  findElementsByFilter(filter: FilterOrderParams): void {
    const initialDate: string = moment(filter.initialDate).format('YYYY-MM-DD');
    const endDate: string = moment(filter.endDate).format('YYYY-MM-DD');
    const params: HttpParams = new HttpParams().set('initialDate', initialDate).set('endDate', endDate).set('user', filter.user);

    this.serviceOrder.findAll(params).subscribe(data => {
      this.listOrders = data;

    });
  }

  createOrder(newOrder: Order): void {
    this.serviceOrder.create(newOrder).subscribe(data => {
      this.listOrders.push(data);
    });
  }

  cancelOrder(orderToCancel: Order): void {
    this.processOrder(orderToCancel, OrderState.CANCELED);
  }
  paidOrder(orderToPaid: Order): void {
    this.processOrder(orderToPaid, OrderState.PAID);
  }

  processOrder(order: Order, newState: OrderState): void {
    this.serviceOrder.process(order, newState).subscribe(data => {
      order.state = data.state;
    });
  }

}
