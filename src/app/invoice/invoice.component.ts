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
  description: string = "";
  limitRanges: Array<PoGaugeRanges> = [];
  bondsLoad: bonds | undefined;
  purchasesLoad: purchases | undefined;

  showBonds: boolean = false;
  showPurchases: boolean = false;
  disableAction: boolean = true;

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
      this.limiteUsado = +this.customer.LIMITEUSADO;
      this.limiteTotal = +this.customer.LIMITE;

      this.limiteDisponivel = (this.limiteTotal - this.limiteDisponivel);
      this.description = `${this.limiteDisponivel.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})} Limite Disponivel`

      this.limitRanges = [
        { from: 0, to: this.limiteUsado, label: `${this.limiteUsado.toLocaleString("pt-BR", {style: "currency", currency: "BRL"}) } Limite Usado`, color: '#c64840' },
        { from: this.limiteUsado, to: this.limiteTotal, label: `${this.limiteTotal.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})} Limite Total`, color: '#00b28e' }
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
    this.customerService.getBonds(this.customer?.LOJA, this.customer?.CODIGO)
      .subscribe(bonds => {
        console.log('bond');
        console.log(bonds);
        this.bondsLoad = bonds;
        this.bondsLoaded = this.bondsLoad?.TitulosAreceber
      });
  }

  getPurchases()
  {
    this.showBonds = false;
    this.showPurchases = true;
  }


  private loadPurchase() {
    this.customerService.getPurchases(this.customer?.LOJA, this.customer?.CODIGO)
      .subscribe(purchases => {
        console.log('purchases');
        console.log(purchases);
        this.purchasesLoad = purchases;
        this.purchasesLoaded = purchases.Vendas;
        this.disableAction = false;
      });
  }
}
