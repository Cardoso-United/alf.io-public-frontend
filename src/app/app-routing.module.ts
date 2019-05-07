import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventListComponent } from './event-list/event-list.component';
import { EventDisplayComponent } from './event-display/event-display.component';
import { BookingComponent } from './reservation/booking/booking.component';
import { OverviewComponent } from './reservation/overview/overview.component';
import { SuccessComponent } from './reservation/success/success.component';
import { ReservationComponent } from './reservation/reservation.component';
import { OfflinePaymentComponent } from './reservation/offline-payment/offline-payment.component';
import { ViewTicketComponent } from './view-ticket/view-ticket.component';
import { ReservationGuard } from './reservation/reservation.guard';

const routes: Routes = [
  { path: '', component: EventListComponent },
  { path: 'event/:eventShortName', component: EventDisplayComponent },
  { path: 'event/:eventShortName/reservation/:reservationId', component: ReservationComponent, canActivate: [ReservationGuard] },
  { path: 'event/:eventShortName/reservation/:reservationId/book', component: BookingComponent, canActivate: [ReservationGuard] },
  { path: 'event/:eventShortName/reservation/:reservationId/overview', component: OverviewComponent, canActivate: [ReservationGuard] },
  { path: 'event/:eventShortName/reservation/:reservationId/waiting-payment', component: OfflinePaymentComponent, canActivate: [ReservationGuard] },
  { path: 'event/:eventShortName/reservation/:reservationId/success', component: SuccessComponent, canActivate: [ReservationGuard] },
  { path: 'event/:eventShortName/ticket/:ticketId/view', component: ViewTicketComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
