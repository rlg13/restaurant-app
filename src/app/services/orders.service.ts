import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Order } from './../model/order';
import { OrderState } from './../model/order-state.enum';
import { environment } from './../../environments/environment';




@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  public static ORDERS_ENDPOINT = `${environment.endpointURL}${environment.endpointApi}/orders`;

  constructor(private http: HttpClient) { }

  protected fromJson(json: any): Order {
    const order: Order = {
      id: json.id,
      user: json.user,
      dayOrder: json.dayOrder,
      dayToServe: json.dayToServe,
      state: json.state,
      firstDish: json.firstDish,
      secondDish: json.secondDish,
      dessert: json.dessert
    };
    return order;
  }

  protected toJson(item: Order) {
    return {
      id: item.id,
      user: item.user,
      dayOrder: item.dayOrder,
      dayToServe: item.dayToServe,
      state: item.state,
      firstDish: item.firstDish,
      secondDish: item.secondDish,
      dessert: item.dessert
    };
  }

  public findAll(params: HttpParams): Observable<Array<Order>> {

    return this.http.get(OrdersService.ORDERS_ENDPOINT, { params })
      .pipe(
        map((array: Array<Order>) => array.map ? array.map(item =>
          this.fromJson(item ? item : {})) : [])
      );
  }
  create(newOrder: Order): Observable<Order> {
    return this.http.post<Order>(OrdersService.ORDERS_ENDPOINT, this.toJson(newOrder))
      .pipe(
        map((jsonResponse: any) => this.fromJson(jsonResponse))
      );
  }

  process(orderToProcess: Order, newState: OrderState): Observable<Order> {
    return this.http.get(`${OrdersService.ORDERS_ENDPOINT}/${orderToProcess.id}/process/${newState}`)
      .pipe(
        map((jsonResponse: any) => this.fromJson(jsonResponse))
      );
  }
}
