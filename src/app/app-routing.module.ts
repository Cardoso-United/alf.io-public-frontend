import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventListComponent } from './event-list/event-list.component';
import { EventDisplayComponent } from './event-display/event-display.component';
import { ReservationComponent } from './reservation/reservation.component';
import { OverviewComponent } from './overview/overview.component';
import { SuccessComponent } from './success/success.component';

const routes: Routes = [
  { path: '', component: EventListComponent },
  { path: 'event/:eventShortName', component: EventDisplayComponent },
  { path: 'event/:eventShortName/reservation/:reservationId/book', component: ReservationComponent },
  { path: 'event/:eventShortName/reservation/:reservationId/overview', component: OverviewComponent },
  { path: 'event/:eventShortName/reservation/:reservationId/success', component: SuccessComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
