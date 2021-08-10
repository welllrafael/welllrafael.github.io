import { bond, bonds } from './../models/bonds';
import { purchase, purchases } from './../models/purchase';
import { Customer } from './../models/customer';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PoGaugeRanges } from '@po-ui/ng-components';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  limiteUsado: number = 0;
  limiteTotal: number = 0;
  limiteDisponivel: number = 0;
  welcomeCustomer: string = "";
  description: string = "";
  limitRanges: Array<PoGaugeRanges> = [];
  bondsLoad: bonds | undefined;
  purchasesLoad: purchases | undefined;

  showBonds: boolean = false;
  showPurchases: boolean = false;
  disableAction: boolean = true;
  customerAlign: boolean = false;

  bondsLoaded: Array<bond> | undefined = [];
  purchasesLoaded: Array<purchase> | undefined = [];

  customer: Customer | undefined;
  constructor(private router: Router,
    private customerService: CustomerService)
  {
    const nav = this.router.getCurrentNavigation();
    this.customer = nav?.extras?.state?.customer;

    if(this.customer !== undefined)
    {
      this.welcomeCustomer = `OLÁ, ${this.customer.NOME}`

      this.limiteUsado = +this.customer.LIMITEUSADO;
      this.limiteTotal = +this.customer.LIMITE;

      this.limiteDisponivel = (this.limiteTotal - this.limiteUsado);
      this.description = `${this.limiteDisponivel.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})} Limite Total`

      this.limitRanges = [
        { from: 0, to: this.limiteUsado, label: `${this.limiteUsado.toLocaleString("pt-BR", {style: "currency", currency: "BRL"}) } Utilizado`, color: '#c64840' },
        { from: this.limiteUsado, to: this.limiteTotal, label: `${this.limiteTotal.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})} Disponível`, color: '#00b28e' }
      ];
    }
    else
    {
      this.router.navigateByUrl('');
    }
  }

  ngOnInit(): void {
    this.loadBonds();
    this.loadPurchase();
  }

  getBonds()
  {
    this.showBonds = true;
    this.showPurchases = false;
  }

  private loadBonds() {
    let venctoBond: string;
    this.customerService.getBonds(this.customer?.LOJA, this.customer?.CODIGO)
      .subscribe(bonds => {
        console.log(bonds,'bond');
        this.bondsLoad = bonds;
        this.bondsLoaded = this.bondsLoad?.TitulosAreceber
        this.bondsLoaded?.map(bonds=>
          {
            venctoBond = bonds.Vencimento
            ? new Date(bonds.Vencimento).toLocaleDateString("pt-BR")
            : new Date(Date.now()).toLocaleDateString("pt-BR");

            bonds.Vencimento = venctoBond;
            bonds.status = (venctoBond > new Date(Date.now()).toLocaleDateString("pt-BR") ? "Em Aberto" : "Atrasado");
            bonds.poColor = (venctoBond > new Date(Date.now()).toLocaleDateString("pt-BR") ? "color-08" : "color-07");
          })
        this.disableAction = false;
      });
  }

  getPurchases()
  {
    this.showBonds = false;
    this.showPurchases = true;
  }

  exit()
  {
    this.router.navigateByUrl('');
  }


  private loadPurchase() {
    this.customerService.getPurchases(this.customer?.LOJA, this.customer?.CODIGO)
      .subscribe(purchases => {
        console.log('purchases');
        console.log(purchases);
        this.purchasesLoad = purchases;
        this.purchasesLoaded = purchases.Vendas;
        //this.disableAction = false;
      });
  }
}
