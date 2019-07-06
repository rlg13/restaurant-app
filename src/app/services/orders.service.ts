import { map } from 'rxjs/operators';
import { Order } from './../model/order';
import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const ORDERS_ENDPOINT = `${environment.endpointURL}${environment.endpointApi}/orders`;

@Injectable({
  providedIn: 'root'
})
export class OrdersService {




  constructor(private http: HttpClient) { }

  protected fromJson(json: any): Order {
    const order: Order = {
      id: json.id,
      user: json.user,
      dayOrder: json.dayOrder,
      state: json.state,
      firstDish: json.firstDish,
      secondDish: json.secondDish,
      dessert: json.dessert,
    }
    return order;
  }

  protected toJson(item: Order) {
    return {
      id: item.id,
      user: item.user,
      dayOrder: item.dayOrder,
      state: item.state,
      firstDish: item.firstDish,
      secondDish: item.secondDish,
      dessert: item.dessert
    }
  }

  public findAll(params: HttpParams): Observable<Array<Order>> {

    return this.http.get(ORDERS_ENDPOINT, { params })
      .pipe(
        map((array: Array<Order>) => array.map ? array.map(item =>
          this.fromJson(item ? item : {})) : [])
      );
  }
  create(newOrder: Order) {
    return this.http.post<Order>(ORDERS_ENDPOINT, this.toJson(newOrder))
      .pipe(
        map((jsonResponse: any) => this.fromJson(jsonResponse))
      );
  }

}
