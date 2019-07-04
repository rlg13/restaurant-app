import { LoginService } from 'src/app/services/login.service';
import { DetailOrderComponent } from './../../detail-order/detail-order.component';
import { Component, OnInit, ViewChild, LOCALE_ID } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';


@Component({
  selector: 'app-main-search',
  providers:[
    LoginService,
    {provide: LOCALE_ID, useValue: 'es'}
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
  createOrder() {
    this.detail.cleanInputs();
    this.detail.showModal = true;
    this.detail.create = true;
  }
}
