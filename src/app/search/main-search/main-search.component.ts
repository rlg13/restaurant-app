import { Order } from './../../model/order';
import { HttpParams } from '@angular/common/http';
import { FilterOrderParams } from './../filter-search/filter-search.component';
import { LoginService } from 'src/app/services/login.service';
import { DetailOrderComponent } from './../../detail-order/detail-order.component';
import { Component, OnInit, ViewChild, LOCALE_ID } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
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

  constructor(private serviceLogin: LoginService, private serviceOrder: OrdersService) { }

  @ViewChild('detail', { static: true }) detail: DetailOrderComponent;
  ngOnInit() {

    this.serviceLogin.checkCredentials();
    this.user = this.serviceLogin.getUsername();
    this.detail.showModal = false;

  }

  logout() {
    this.serviceLogin.logout();
  }
  openCreateOrder() {
    this.detail.cleanInputs();
    this.detail.showModal = true;
    this.detail.create = true;
  }

  findElementsByFilter(filter: FilterOrderParams) {

    const initialDate: string = moment(filter.initialDate).format('YYYY-MM-DD');
    const endDate: string = moment(filter.endDate).format('YYYY-MM-DD');
    let params: HttpParams = new HttpParams().set('initialDate', initialDate).set('endDate', endDate).set('user', filter.user);

    this.serviceOrder.findAll(params).subscribe(data => {
      this.listOrders = data;

    });

  }

  createOrder(newOrden: Order) {
    this.serviceOrder.create(newOrden).subscribe(data => {
      this.listOrders.push(data);
    });
  }
}
