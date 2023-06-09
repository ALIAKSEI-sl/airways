import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { ColorSchemeService } from 'app/core/services/color-scheme.service';
import { MY_FORMATS } from 'app/search/consts/my_date';
import { FormatParamService } from 'app/core/services/format-param.service';
import { ordersCount } from 'app/redux/selectors/flights.selectors';
import { AuthService } from 'app/user/services/auth.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userName!: string;

  subscriptionOnUserName!: Subscription;

  subscriptionOnChangeScheme!: Subscription;

  isColorScheme!: boolean;

  ordersCount$!: Observable<number>;

  constructor(
    public authService: AuthService,
    public colorScheme: ColorSchemeService,
    public format: FormatParamService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.authService.checkLogIn();

    this.subscriptionOnChangeScheme = this.colorScheme.isColorScheme.subscribe(
      (boolean) => (this.isColorScheme = boolean)
    );

    this.subscriptionOnUserName = this.authService.userName.subscribe(
      (name) => (this.userName = name)
    );

    this.ordersCount$ = this.store.select(ordersCount);
  }

  ngOnDestroy(): void {
    this.subscriptionOnUserName.unsubscribe();
    this.subscriptionOnChangeScheme.unsubscribe();
  }

  openUserSettings() {
    if (!this.authService.isUserLoggedIn()) {
      if (this.authService.isLoginPageVisible$.getValue()) {
        this.authService.isLoginPageVisible$.next(false);
        this.authService.isChangeHeightMain = false;
      } else {
        this.authService.isLoginPageVisible$.next(true);
      }
    } else {
      this.router.navigateByUrl('/user-account');
    }
  }

  redirectToSearch() {
    if (this.router.url !== '/search') {
      this.router.navigateByUrl('search');
      this.colorScheme.forPageMain();
    }
  }

  public changeDateFormat(format: string) {
    MY_FORMATS.display.dateInput = format
  }
  navigationByCart() {
    this.router.navigateByUrl('/booking/cart');
  }
}
