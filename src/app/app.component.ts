import { Customer } from 'src/app/models/customer';
import { Component } from '@angular/core';
import { LoginService } from 'src/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'clientPage';
  customerLogged: Customer | undefined;

  constructor()
  {

  }

}


