import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Event } from 'src/app/model/event';
import { TranslateService } from '@ngx-translate/core';
import { I18nService } from 'src/app/shared/i18n.service';
import { zip, of } from 'rxjs';
import { LocalizedCountry } from 'src/app/model/localized-country';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html'
})
export class InvoiceFormComponent implements OnInit {

  @Input()
  form: FormGroup;

  @Input()
  event: Event;

  countries: LocalizedCountry[];
  euCountries: LocalizedCountry[];

  constructor(private translate: TranslateService, private i18nService: I18nService) { }

  ngOnInit(): void {
    this.getCountries(this.translate.currentLang);
    this.translate.onLangChange.subscribe(change => {
      this.getCountries(this.translate.currentLang);
    });

    this.updateItalyEInvoicingFields();

    this.form.get('italyEInvoicingReferenceType').valueChanges.subscribe(change => {
      this.updateItalyEInvoicingFields();
    });
  }


  updateItalyEInvoicingFields(): void {
    this.form.get('italyEInvoicingReferenceAddresseeCode').disable();
    this.form.get('italyEInvoicingReferencePEC').disable();

    const refType = this.form.get('italyEInvoicingReferenceType').value;
    if (refType === 'ADDRESSEE_CODE') {
      this.form.get('italyEInvoicingReferencePEC').setValue(null);
      this.form.get('italyEInvoicingReferenceAddresseeCode').enable();
    } else if (refType === 'PEC') {
      this.form.get('italyEInvoicingReferenceAddresseeCode').setValue(null);
      this.form.get('italyEInvoicingReferencePEC').enable();
    } else if (refType === 'NONE') {
      this.form.get('italyEInvoicingReferencePEC').setValue(null);
      this.form.get('italyEInvoicingReferenceAddresseeCode').setValue(null);
    }
  }

  getCountries(currentLang: string): void {

    const euCountriesObs = this.euVatCheckingEnabled ? this.i18nService.getEUVatCountries(currentLang) : of([]);
    
    zip(this.i18nService.getVatCountries(currentLang), euCountriesObs).subscribe( ([countries, euCountries]) => {
      this.countries = countries;
      this.euCountries = euCountries;
    });
  }

  get euVatCheckingEnabled(): boolean {
    return this.event.invoicingConfiguration.euVatCheckingEnabled;
  }

  get customerReferenceEnabled(): boolean {
    return this.event.invoicingConfiguration.customerReferenceEnabled;
  }

  get invoiceBusiness(): boolean {
    return this.form.value.addCompanyBillingDetails
  }

  get vatNumberStrictlyRequired(): boolean {
    return this.event.invoicingConfiguration.vatNumberStrictlyRequired;
  }

  get enabledItalyEInvoicing(): boolean {
    return this.event.invoicingConfiguration.enabledItalyEInvoicing;
  }

}
