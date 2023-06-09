import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { IOrder } from 'app/booking/models/flightDetails.model';
import { FormatParamService } from 'app/core/services/format-param.service';
import { saveOrders } from 'app/redux/actions/orders.actions';
import { AuthService } from 'app/user/services/auth.service';

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss'],
})
export class TableHeaderComponent {
  @Input() orders!: IOrder[];

  @Input() visibilitySelection = false;

  @Output() sendSelect = new EventEmitter<{
    checked: boolean;
    index: number;
  }>();

  constructor(
    public format: FormatParamService,
    public store: Store,
    private router: Router,
    private auth: AuthService
  ) {}

  selectOrder(event: Event, index: number) {
    const checked = (<HTMLInputElement>event.target).checked;
    this.sendSelect.emit({ checked, index });
  }

  deleteOrder(i: number) {
    const ordersStorage = localStorage.getItem('airwaysOrders');
    if (ordersStorage) {
      const orders: IOrder[] = JSON.parse(ordersStorage);
      const newOrders = orders.filter((_, index) => index !== i);
      this.store.dispatch(saveOrders({ orders: newOrders }));
      localStorage.setItem('airwaysOrders', JSON.stringify(newOrders));
    }
  }

  navigationBySummary(i: number) {
    this.auth.selected.oder = i;
    this.router.navigateByUrl('/user-account/summary');
  }
}
