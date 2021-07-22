import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';
import { LoginService } from 'src/services/login.service';
import { Customer } from '../models/customer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  customerLogged: Customer | undefined;

  reactiveForm!: FormGroup;
  link: string = 'https://www.google.com.br/search?q=megamodas+mega+modas';
  primary: boolean = true;
  height: number = 210;
  login: string = "";
  birthday!: Date;

  ngOnInit(): void {
  }

  constructor(private loginService: LoginService,
    private router: Router,
    private fb: FormBuilder,
    private datepipe: DatePipe,
    private poNotification: PoNotificationService)
  {
    this.createReactiveForm();
  }

  createReactiveForm() {
    this.reactiveForm = this.fb.group({
      login: ['', Validators.compose([Validators.required, Validators.pattern(/(\d{3})(\d{3})(\d{3})(\d{2})/)])],
      birthday: ['', Validators.required]
    });
  }

  loginCustomer()
  {
    let customerLocal: Customer;
    //'96363886104'#'24/06/1985'
    this.loginService.login(this.login,this.datepipe.transform(this.birthday,'dd/MM/yyyy'))
      .subscribe(customer => {
        this.customerLogged = customer
        customerLocal = customer

        if (this.customerLogged.CODIGO !== undefined)
        {
          this.router.navigateByUrl('invoice',{state: {customer: customerLocal}});
        }
        else
        {
          this.poNotification.error(`Cliente nao encontrado`);
        }
      },
      error => {
          console.log(error);
          this.poNotification.error(`Error ao fazer login ${error.message}`);
      })
  }

  redirectTo() {
    window.open(this.link, '_blank');
  }

}
