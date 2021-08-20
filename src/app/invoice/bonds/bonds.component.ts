import { bond } from './../../models/bonds';
import { Component, Input, OnInit } from '@angular/core';

import {
  PoListViewAction,
  PoNotificationService} from '@po-ui/ng-components';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-bonds',
  templateUrl: './bonds.component.html',
  styleUrls: ['./bonds.component.css']
})
export class BondsComponent implements OnInit {

  purchasesLocal: Array<bond> = [];
  customerLocal: Customer | undefined;

  labelFilter: string = '';
  hide: boolean = false;
  selectedActionItem = {};
  titleDetailsModal: string = 'User Detail';
  @Input() bonds: Array<bond> | undefined;
  @Input() customer: Customer | undefined;

  readonly actions: Array<PoListViewAction> = [
    {
      label: 'Pix',
      action: this.paymentByPix.bind(this),
      disabled: true,
      icon: 'po-icon po-icon-pix-logo'
    },
    {
      label: 'WhatsApp',
      action: this.sendToWhatsApp.bind(this),
      disabled: false,
      type: 'default',
      icon: 'po-icon po-icon-plus-circle'
    }
  ];

  constructor(
    private poNotification: PoNotificationService
  ) {}

  ngOnInit() {
    if (this.bonds !== undefined)
        this.purchasesLocal = this.bonds
     
    if (this.customer !== undefined)
        this.customerLocal = this.customer    
  }

  formatTitle(item: any) {
    return `Titulo - ${item.Numero}`;
  }

  showDetail(item: any) {
    return item.url;
  }

  paymentByPix(){

  }

  sendToWhatsApp(pItem: any){

    let cpf: any = this.customerLocal?.CGC.replace(/[^\d]/g, "");

    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

    window.open(`http://api.whatsapp.com/send?1=pt_BR&phone=5565992575958&text=Gostaria%20de%20falar%20sobre%20o%20CPF:%20${cpf}%20título:%20${pItem.Numero}`,'_blank');
  }

}
