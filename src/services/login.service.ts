import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Customer } from 'src/app/models/customer';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly loginUrl = 'http://177.126.173.4:1402/rest/JAFLUW15/CLIENTE?cFIL=0101&cEmpAnt=01&';

  constructor(private httpClient: HttpClient) { }

  login(cpf: string, dateBirthday: string):
    Observable<Customer> {
    return this.httpClient
      .get<Customer>(`${this.loginUrl}&cDtnasc=${dateBirthday}&cCgc=${cpf}`)
  }

}
