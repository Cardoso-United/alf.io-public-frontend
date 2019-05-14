import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { PaymentMethod, PaymentProxy } from 'src/app/model/event';
import { PaymentProvider, SimplePaymentProvider } from '../payment-provider';

@Component({
  selector: 'app-offline-payment-proxy',
  templateUrl: './offline-payment-proxy.component.html'
})
export class OfflinePaymentProxyComponent implements OnChanges {

  @Input()
  method: PaymentMethod;

  @Input()
  proxy: PaymentProxy;

  @Input()
  parameters: {[key:string]: any};

  @Output()
  paymentProvider: EventEmitter<PaymentProvider> = new EventEmitter<PaymentProvider>();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.matchProxyAndMethod && changes.method) {
      this.paymentProvider.emit(new SimplePaymentProvider());
    }
  }

  public get matchProxyAndMethod(): boolean {
    return this.method === 'BANK_TRANSFER' && this.proxy === 'OFFLINE';
  }
}