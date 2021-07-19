import { purchases } from './../models/purchase';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { bonds } from '../models/bonds';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private readonly bondsUrl = 'http://177.126.173.4:1402/rest/JAFLUW16/?cFIL=0101&cEmpAnt=01&';
  private readonly purchaseUrl = 'http://177.126.173.4:1402/rest/JAFLUW14/?cFIL=0101&cEmpAnt=01&';

  constructor(private httpClient: HttpClient) { }

  getBonds(store?: string, code?: string):
    Observable<bonds> {
    console.log(`${this.bondsUrl}&cLoja=${store}&cCliente=${code}`);
    return this.httpClient
      .get<bonds>(`${this.bondsUrl}&cLoja=${store}&cCliente=${code}`)
  }

  getPurchases(store?: string, code?: string):
    Observable<purchases> {
    return this.httpClient
      .get<purchases>(`${this.purchaseUrl}&cLoja=${store}&cCliente=${code}`)
  }
}
