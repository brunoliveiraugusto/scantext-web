import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ScanResponse } from '../models/scan-reponse';

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService<T> {

  protected _http: HttpClient;
  protected resource: string;
  protected baseUrl: string;

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
}
