import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IFlightsState } from '../flightState.model';

export const selectFlightsState = createFeatureSelector<IFlightsState>('app');

export const selectFlightsName = createSelector(
  selectFlightsState,
  (state) => state.flights_name
);

export const selectSearchFlight = createSelector(
  selectFlightsState,
  (state) => state.flight
);

export const selectSearchForm = createSelector(
  selectFlightsState,
  (state) => state.searchForm
);

export const selectPassengers = createSelector(
  selectFlightsState,
  (state) => state.passengersForm.passengers
);
