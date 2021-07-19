import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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


  ngOnInit(): void {
  }

  constructor(private loginService: LoginService,
    private router: Router,
    private fb: FormBuilder)
  {
    this.createReactiveForm();
  }

  createReactiveForm() {
    this.reactiveForm = this.fb.group({
      login: ['', Validators.compose([Validators.required, Validators.pattern(/(\d{3})(\d{3})(\d{3})(\d{2})/)])],
      brithday: ['', Validators.required]
    });
  }

  loginCustomer()
  {
    let customerLocal: Customer;
    this.loginService.login('96363886104','24/06/1985')
      .subscribe(customer => {
        this.customerLogged = customer
        customerLocal = customer
        if (this.customerLogged !== undefined)
        {
          this.router.navigateByUrl('invoice',{state: {customer: customerLocal}});
        }
      })
  }

  redirectTo() {
    window.open(this.link, '_blank');
  }

}
