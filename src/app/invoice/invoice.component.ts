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
      this.description = `${this.limiteTotal.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})} Limite Total`

      this.limitRanges = [
        { from: 0, to: this.limiteUsado, label: `${this.limiteUsado.toLocaleString("pt-BR", {style: "currency", currency: "BRL"}) } Utilizado`, color: '#c64840' },
        { from: this.limiteUsado, to: this.limiteTotal, label: `${this.limiteDisponivel.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})} Disponível`, color: '#00b28e' }
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
    let dateConvert: Date;
    let timeDiff: number;
    let diffDays: number;
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

            console.log(venctoBond);
            console.log(new Date(Date.now()).toLocaleDateString("pt-BR"));

            dateConvert = this.stringToDate(venctoBond);
            bonds.Vencimento = venctoBond;
            timeDiff = Math.abs(dateConvert.getTime() - new Date(Date.now()).getTime());
            diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            bonds.status = (dateConvert > new Date(Date.now()) ? "A Vencer" : "Atrasado");

            if (dateConvert >= new Date(Date.now()))
            {
              switch(true) {
                case diffDays <= 30: {
                  bonds.poColor = "color-08";
                  bonds.status = "A Vencer no mês";
                  break;
                }
                default: {
                  bonds.poColor = "color-01";
                  break;
                }
              }
            }
            else
            {
              bonds.poColor = "color-07";
            }
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

  stringToDate(dateParam: string) {
    let partesData: String[] = dateParam.split("/");
    let newDate: Date = new Date(Number(partesData[2]), Number(partesData[1]) - 1, Number(partesData[0]));
    return newDate;
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
