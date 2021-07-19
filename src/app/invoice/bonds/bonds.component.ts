import { bond } from './../../models/bonds';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

import {
  PoListViewAction,
  PoNotificationService,
  PoPageAction,
  PoPageFilter
} from '@po-ui/ng-components';

@Component({
  selector: 'app-bonds',
  templateUrl: './bonds.component.html',
  styleUrls: ['./bonds.component.css']
})
export class BondsComponent implements OnInit {

  purchasesLocal: Array<bond> = [];

  labelFilter: string = '';
  hide: boolean = false;
  selectedActionItem = {};
  titleDetailsModal: string = 'User Detail';
  @Input() bonds: Array<bond> | undefined;

  readonly actions: Array<PoListViewAction> = [
    {
      label: 'Pix',
      action: this.paymentByPix.bind(this),
      disabled: true,
      icon: 'po-icon po-icon-pix-logo'
    },
    {
      label: 'Outros',
      action: ()=>{},
      disabled: true,
      type: 'danger',
      icon: 'po-icon po-icon-plus-circle'
    }
  ];

  constructor(
    private poNotification: PoNotificationService
  ) {}

  ngOnInit() {
    if (this.bonds !== undefined)
        this.purchasesLocal = this.bonds
  }

  formatTitle(item: any) {
    return `Titulo - ${item.Numero}`;
  }

  showDetail(item: any) {
    return item.url;
  }

  paymentByPix(){

  }

}
