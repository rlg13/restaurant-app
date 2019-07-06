import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Dish } from '../model/dish';
import { AbstractBaseService } from './abstract-base.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  public static DISH_ENDPOINT = '/dishes';
  public static DISH_TYPE_ENDPOINT = '/dishes/type/';


  constructor(private http: HttpClient) { }

  protected fromJson(json: any): Dish {
    const user: Dish = {
      id: json.id,
      name: json.name,
      type: json.type
    }
    return user;
  }

  protected toJson(item: Dish) {
    return {
      id: item.id,
      name: item.name,
      type: item.type
    }
  }

  create(newDish: Dish) {
    return this.http.post<Dish>(`${environment.endpointURL}${environment.endpointApi}${DishService.DISH_TYPE_ENDPOINT}`, this.toJson(newDish))
      .pipe(
        map((jsonResponse: any) => this.fromJson(jsonResponse))
      );
  }


  findByType(typeDish: string) {
    return this.http.get(`${environment.endpointURL}${environment.endpointApi}${DishService.DISH_TYPE_ENDPOINT}${typeDish}`)
      .pipe(
        map((jsonResponses: Array<Dish>) => jsonResponses.map ? jsonResponses.map(jsonItem =>
          this.fromJson(jsonItem)) : [])
      );
  }

}
