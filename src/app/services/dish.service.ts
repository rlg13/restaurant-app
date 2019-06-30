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
export class DishService extends AbstractBaseService<Dish> {

  public static DISH_ENDPOINT = '/dishes';
  public static DISH_TYPE_ENDPOINT = '/dishes/type/';


  constructor(private _http: HttpClient, private _router: Router) {
    super(_http, environment.endpointURL + environment.endpointApi);
  }

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

  findByType(typeDish: string){
    return this._http.get(`${this.endpointResource}${DishService.DISH_TYPE_ENDPOINT}${typeDish}`, { headers: this.headersHttp })
      .pipe(
        map((jsonResponses: Array<Dish>) => jsonResponses.map ? jsonResponses.map(jsonResponse =>
          this.fromJson(jsonResponse)) : [])
      );
  }

}
