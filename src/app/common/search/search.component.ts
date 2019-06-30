import { DetailOrderComponent } from './../../detail-order/detail-order.component';
import { Component, OnInit, LOCALE_ID, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { LoginService, User } from 'src/app/services/login.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-search',
  providers: [
    LoginService,
    {provide: LOCALE_ID, useValue: 'es'}
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  private static milisecondsPerDay = 24 * 60 * 60 * 1000;

  public user: string;
  public initialDate: Date;
  public endDate: Date;
  public opened: boolean;
  public create: boolean;
  public orderDay: Date;
  public firstsOptions: string;
  public secondsOptions: string;
  public dessertsOptions: string;

  searchForm = new FormGroup({
    initialDateForm: new FormControl('', Validators.required),
    endDateForm: new FormControl('', Validators.required),
    });
  

  constructor(private _serviceLogin: LoginService, private _serviceOrder: OrdersService) { }

  @ViewChild('detail', {static: true}) detail: DetailOrderComponent;
  ngOnInit() {

    this._serviceLogin.checkCredentials();
    this.user = this._serviceLogin.getUsername();
    this.detail.showModal = false;
    //start dates with three days before and four after;
    this.initialDate = new Date((new Date()).getTime() - (3 * SearchComponent.milisecondsPerDay));
    this.endDate = new Date((new Date()).getTime() + (4 * SearchComponent.milisecondsPerDay));

    this.searchForm.patchValue({
      initialDateForm: this.initialDate.toJSON(),
      endDateForm: this.endDate.toJSON()
    });
  }

  logout() {
    this._serviceLogin.logout();
  }

  filter() {
    //invoke filter system
  }
  createOrder() {
    this.detail.showModal  = true;
    this.create = true;
  }
  openDetail() {
    this.detail.showModal  = true;
    this.create = false;
  }

}
