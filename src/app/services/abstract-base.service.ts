import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractBaseService<T> {

  headersHttp: HttpHeaders;

  constructor(private _httpClient: HttpClient, protected endpointResource: string) {
    this.headersHttp = new HttpHeaders()
      .append('Access-Control-Allow-Origin', '*');
      //.append('Content-Type', 'application/json; charset=utf-8')
      //.append('Access-Control-Max-Age', '86400');
  }

  protected abstract fromJson(json: any): T;
  protected abstract toJson(item: T): any;

  public create(serviceEndpoint: string, data: T): Observable<T> | null {
    return this._httpClient.post<T>(`${this.endpointResource}${serviceEndpoint}`, this.toJson(data), { headers: this.headersHttp })
      .pipe(
        map((jsonResponse: any) => this.fromJson(jsonResponse))
      );
  }

  public findById(serviceEndpoint: string, objectToReturn: string, id: any,
    fetch?: any, parameters: { [index: string]: any } = {}): Observable<T> {
    return this._httpClient.post(`${this.endpointResource}${serviceEndpoint}`, parameters, { headers: this.headersHttp })
      .pipe(
        map((jsonResponse: any) => this.fromJson(objectToReturn ? jsonResponse[objectToReturn] : jsonResponse))
      );
  }

  public find(serviceEndpoint: string, data: T) {
    return this._httpClient.post<T>(`${this.endpointResource}${serviceEndpoint}`, this.toJson(data), { headers: this.headersHttp })
      .pipe(
        map((jsonResponse: any) => this.fromJson(jsonResponse))
      );
  }

  public findAll(serviceEndpoint: string, objectToReturn: string,
    fetch?: any, parameters: { [index: string]: any } = {}): Observable<Array<T>> {
    return this._httpClient.post(`${this.endpointResource}${serviceEndpoint}`, parameters, { headers: this.headersHttp })
      .pipe(
        map((jsonResponses: Array<T>) => jsonResponses.map ? jsonResponses.map(jsonResponse =>
          this.fromJson(objectToReturn ? jsonResponse[objectToReturn] : jsonResponse)) : [])
      );
  }

  public findGetAll(serviceEndpoint: string, objectToReturn: string,
    fetch?: any, parameters: { [index: string]: any } = {}): Observable<Array<T>> {
    return this._httpClient.get(`${this.endpointResource}${serviceEndpoint}`, { headers: this.headersHttp })
      .pipe(
        map((jsonResponses: Array<T>) => jsonResponses.map ? jsonResponses.map(jsonResponse =>
          this.fromJson(objectToReturn ? jsonResponse[objectToReturn] : jsonResponse)) : [])
      );
  }

  public delete(serviceEndpoint: string, id: any) {
    return this._httpClient.delete(`${this.endpointResource}${serviceEndpoint}/${id}`, { headers: this.headersHttp });
  }

  public update(serviceEndpoint: string, fieldId: string, data: T): Observable<T> {
    return this._httpClient.put(
      `${this.endpointResource}${serviceEndpoint}/${eval(`data.${fieldId}`)}`, this.toJson(data), { headers: this.headersHttp })
      .pipe(
        map((jsonResponse: any) => this.fromJson(jsonResponse))
      );
  }

  protected getParams(parameters: { [index: string]: any }, fetchs: any = []): { params: HttpParams } {
    let params = new HttpParams();
    const keys = Object.keys(parameters);
    if (keys.length) {
      Object.keys(parameters).forEach((key) => params = params.set(key, parameters[key]));
    }
    if (fetchs && fetchs.length > 0) {
      params = params.set('fetchs', fetchs);
    }
    return { params };
  }

}
