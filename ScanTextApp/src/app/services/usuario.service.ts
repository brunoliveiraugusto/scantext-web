import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends BaseHttpService<any> {

  constructor(http: HttpClient) { 
    super(http, 'usuario')
  }
}
