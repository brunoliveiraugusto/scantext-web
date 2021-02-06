import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ScanResponse } from '../models/scan-reponse';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService<T> {

  protected _http: HttpClient;
  protected resource: string;
  protected baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, resource: string) { 
    this._http = http;
    this.resource = resource;
  }

  public get(action: string): Observable<ScanResponse<T>> {
    return this._http.get<ScanResponse<T>>(`${this.baseUrl}/${this.resource}/${action}`);
  }

  public getById(action: string = '', id: string): Observable<ScanResponse<T>> {
    return this._http.get<ScanResponse<T>>(`${this.baseUrl}/${this.resource}/${action}${id}`);
  }

  public getAll(action: string = ''): Observable<ScanResponse<Array<T>>> {
    return this._http.get<ScanResponse<Array<T>>>(`${this.baseUrl}/${this.resource}/${action}`);
  }

  public post(action: string = '', body: any): Observable<ScanResponse<any>> {
    return this._http.post<ScanResponse<any>>(`${this.baseUrl}/${this.resource}/${action}`, body);
  }
}
