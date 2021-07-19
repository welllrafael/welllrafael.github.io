import { purchase, purchases } from './../../models/purchase';
import { Component, Input, OnInit} from '@angular/core';

import {
  PoListViewAction,
  PoNotificationService,
  PoPageAction,
  PoPageFilter
} from '@po-ui/ng-components';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {

  purchasesLocal: Array<purchase> = [];
  labelFilter: string = '';
  hide: boolean = false;
  selectedActionItem = {};
  titleDetailsModal: string = 'User Detail';
  @Input() purchases: Array<purchase> | undefined;

  constructor(
    private poNotification: PoNotificationService
  ) {}

  ngOnInit() {
    if (this.purchases !== undefined)
        this.purchasesLocal = this.purchases
  }

  formatTitle(item: any) {
    return `Nota Fiscal - ${item.Doc}`;
  }

  showDetail(item: any) {
    return item.url;
  }

}


