import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { OrderCardComponent } from './components/order-card/order-card.component';
import { PopUpAuthComponent } from './components/pop-up-auth/pop-up-auth.component';
import { PopUpComponent } from './components/pop-up/pop-up.component';
import { TableHeaderComponent } from './components/table-header/table-header.component';
import { TableRowComponent } from './components/table-row/table-row.component';

@NgModule({
  declarations: [
    TableHeaderComponent,
    TableRowComponent,
    OrderCardComponent,
    PopUpComponent,
    PopUpAuthComponent,
  ],
  imports: [CommonModule, MatIconModule, MatMenuModule, MatButtonModule],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule,
    MatTooltipModule,
    MatToolbarModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    HttpClientModule,
    TableHeaderComponent,
    OrderCardComponent,
    MatBadgeModule,
    MatSnackBarModule,
  ],
  providers: [MatDatepickerModule, PopUpComponent, PopUpAuthComponent],
})
export class SharedModule {}
