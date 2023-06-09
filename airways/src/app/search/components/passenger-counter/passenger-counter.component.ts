/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, Input } from '@angular/core';
import { MainService } from './../../services/main.service';

@Component({
  selector: 'app-passenger-counter',
  templateUrl: './passenger-counter.component.html',
  styleUrls: ['./passenger-counter.component.scss']
})
export class PassengerCounterComponent {
  @Input() public passengerType = '';

  @Input() public passengerYear = '';

  constructor(public mainService: MainService) {}

  public increase() {
    switch (this.passengerType) {
      case 'Adults':
        if(this.mainService.adultCount < 9) this.mainService.adultCount++;
        break;
      case 'Child':
        this.mainService.adultCount == 0 ? this.mainService.adultCount++ : this.mainService.adultCount;
        if(this.mainService.childCount < 9) this.mainService.childCount++;
        break;
      case 'Infant':
        if(!this.mainService.adultCount) this.mainService.adultCount++;
        this.mainService.adultCount == 0 ? this.mainService.adultCount++ : this.mainService.adultCount;
        if(this.mainService.infantCount < 9) this.mainService.infantCount++;
        break;

      default:
        break;
    }
  }

  public decrease() {
    switch (this.passengerType) {
      case 'Adults':
        this.mainService.adultCount > 0 ? this.mainService.adultCount-- : 0;
        if(this.mainService.adultCount == 0) {
          this.mainService.childCount = 0;
          this.mainService.infantCount = 0;
        }
        break;
      case 'Child':
        this.mainService.childCount > 0 ? this.mainService.childCount-- : 0;
        break;
      case 'Infant':
        this.mainService.infantCount > 0 ? this.mainService.infantCount-- : 0;
        break;

      default:
        break;
    }
  }
}
