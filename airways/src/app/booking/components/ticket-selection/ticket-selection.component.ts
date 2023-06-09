import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, map } from 'rxjs';
import { ITicket } from 'app/booking/models/ticket.model';
import { selectSearchFlight, selectSearchForm } from 'app/redux/selectors/flights.selectors';
import { IDate } from 'app/shared/models/date.model';
import { saveSelectedTickets } from 'app/redux/actions/flights.actions';
import { FormatParamService } from 'app/core/services/format-param.service';

@Component({
  selector: 'app-ticket-selection',
  templateUrl: './ticket-selection.component.html',
  styleUrls: ['./ticket-selection.component.scss']
})
export class TicketSelectionComponent implements OnInit  {

  constructor(
              private store: Store,
              private elementRef: ElementRef,
              private renderer: Renderer2,
              private router: Router,
              public formatParamService: FormatParamService
              ) {}

  public searchFlight$ = this.store.select(selectSearchFlight);

  public searchForm$ = this.store.select(selectSearchForm);

  public flightDates: {departures: any[], destinations: any[]} = {
    departures: [],
    destinations: []
  };

  public isDepartureTicketSelected = false;

  public isDestinationTicketSelected = false;

  public selectedDepartureTicket!: ITicket;
  
  public selectedDestinationTicket: ITicket | undefined;

  ngOnInit(): void {
    combineLatest([this.searchFlight$, this.searchForm$ ])
    .pipe(
      map(([searchFlight, searchForm ]) => {
        const startDate: IDate[] = JSON.parse(JSON.stringify(searchFlight[0].dates));
        const startDates: {date: Date, price?: string, departure_time?: string, arrival_time?: string, duration?: string, disabled?: boolean, flight_no?: string, passengers?: string[], reserved_tickets?: string[], columns?: number, rows?: string[]}[] = this.addDates(searchForm.start!);
        startDates.map((date) => {
          startDate.forEach((flightDates, i) => {
            if(date.date.getTime() == new Date(flightDates.date).getTime()) {
              delete startDate[i];
              date.price = flightDates.prices.adult;
              date.departure_time = flightDates.departure_time;
              date.arrival_time = flightDates.arrival_time;
              date.duration = flightDates.duration;
              date.flight_no = searchFlight[0].flight_no
              date.passengers = searchForm.passengers
              date.reserved_tickets = flightDates.reserved_tickets
              date.columns = searchFlight[0].columns;
              date.rows = JSON.parse(JSON.stringify(searchFlight[0].rows));
            }
            else {
              date.price = date.price ? date.price : ' ';
              date.columns = searchFlight[0].columns;
              date.rows = JSON.parse(JSON.stringify(searchFlight[0].rows));
            }
          });
          return date
        })
        if(searchForm.tripType == '1') {
          const endDate: IDate[] = JSON.parse(JSON.stringify(searchFlight[1].dates));
          const endDates: {date: Date, price?: string, departure_time?: string, arrival_time?: string, duration?: string, disabled?: boolean, flight_no?: string, passengers?: string[], reserved_tickets?: string[], columns?: number, rows?: string[]}[] = this.addDates(searchForm.end!)
          endDates.map((date) => {
            endDate.forEach((flightDates, i) => {
              if(date.date.getTime() == new Date(flightDates.date).getTime()) {
                delete endDate[i];
                date.price = flightDates.prices.adult;
                date.departure_time = flightDates.departure_time;
                date.arrival_time = flightDates.arrival_time;
                date.duration = flightDates.duration;
                date.flight_no = searchFlight[1].flight_no
                date.passengers = searchForm.passengers
                date.reserved_tickets = flightDates.reserved_tickets
                date.columns = searchFlight[1].columns;
                date.rows = JSON.parse(JSON.stringify(searchFlight[1].rows));
              }
              else {
                date.price = date.price ? date.price : ' ';
                date.columns = searchFlight[1].columns;
                date.rows = JSON.parse(JSON.stringify(searchFlight[1].rows));;
              }
            });
            return date
          })
          return [startDates, endDates]
        }
        else {
          return [startDates]
        }
      })
    ).subscribe((dates) => {
      this.flightDates.departures = dates[0];
      this.flightDates.departures.map((departure) => {
        if(departure.price == ' ') {
           departure.disabled = true;
        }
        else departure.disabled = false;
       })
      if(dates.length > 1) {
        this.flightDates.destinations = dates[1];
        this.flightDates.destinations.map((destination) => {
         if(destination.price == ' ') {
            destination.disabled = true;
         }
         else destination.disabled = false;
        })
      }
    });

  }

  public addDates(date: Date) {
    const givenDate = date;

    const datesBefore = Array.from(Array(5),  (_, i) => {
      const daysToAdd = i;
      const resDate = new Date(givenDate);
      resDate.setDate(resDate.getDate() - daysToAdd);
      return {date: resDate};
    });

    const datesLater = Array.from(Array(5),  (_, i) => {
      const daysToAdd = i;
      const resDate = new Date(givenDate);
      resDate.setDate(resDate.getDate() + daysToAdd + 1);
      return {date: resDate};
    });

    return [datesBefore.reverse(), datesLater].flat(1)
  }

  public selectTicket(direction: string, action: string, ticket?: any) {
    let tabLabel;
    if(action == 'edit' && direction == 'departure') {
      this.selectedDepartureTicket = {
        arrival_time: '',
        date: new Date(),
        departure_time: '',
        disabled: true,
        duration: '',
        price: '',
        flight_no: '',
        passengers: [],
        seats: [],
        reserved_tickets: []
      }
      tabLabel = this.elementRef.nativeElement.querySelectorAll('.mat-mdc-tab-header')[0];
      this.isDepartureTicketSelected = false;
      this.renderer.setStyle(tabLabel, 'display', 'flex');
    }
    else if(action == 'edit' && direction == 'destination') {
      this.selectedDestinationTicket = {
        arrival_time: '',
        date: new Date(),
        departure_time: '',
        disabled: true,
        duration: '',
        price: '',
        flight_no: '',
        passengers: [],
        seats: [],
        reserved_tickets: []
      };
      tabLabel = this.elementRef.nativeElement.querySelectorAll('.mat-mdc-tab-header')[1];
      this.isDestinationTicketSelected = false;
      this.renderer.setStyle(tabLabel, 'display', 'flex')
    }
    if(direction == 'departure' && action == 'select') {
       this.selectedDepartureTicket = ticket;
       this.selectedDepartureTicket.seats = [];
       tabLabel = this.elementRef.nativeElement.querySelectorAll('mat-tab-header')[0];
       this.isDepartureTicketSelected = true;
       this.renderer.setStyle(tabLabel, 'display', 'none')
    }
    else if(direction == 'destination' && action == 'select') {
      this.selectedDestinationTicket = ticket;
      this.selectedDestinationTicket!.seats = [];
       tabLabel = this.elementRef.nativeElement.querySelectorAll('mat-tab-header')[1];
       this.isDestinationTicketSelected = true;
       this.renderer.setStyle(tabLabel, 'display', 'none')
    }
  }

  public saveTickets() {
    if(this.selectedDestinationTicket) {
      let totalPassengers = +this.selectedDepartureTicket.passengers[0][0] + +this.selectedDepartureTicket.passengers[1][0];
      for (let i = 1; i <= totalPassengers; i++) {
        let row = this.flightDates.departures[0].rows[Math.floor((i - 1) / this.flightDates.departures[0].columns)];
        let column = (i - 1) % this.flightDates.departures[0].columns + 1;
        let seat_number = column + row;
        if(this.selectedDepartureTicket.reserved_tickets.includes(seat_number)) {
          totalPassengers++;
          continue
        }
        this.selectedDepartureTicket.seats.push(seat_number);
        this.selectedDestinationTicket.seats.push(seat_number);
      }
      this.store.dispatch(saveSelectedTickets({departureTicket: this.selectedDepartureTicket,  destinationTicket: this.selectedDestinationTicket}))
    }
    else {
       this.store.dispatch(saveSelectedTickets({departureTicket: this.selectedDepartureTicket}))
    }
    this.router.navigate(['booking'])
  }
}
