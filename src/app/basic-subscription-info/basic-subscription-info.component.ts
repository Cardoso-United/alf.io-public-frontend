import {Component, Input} from '@angular/core';
import {BasicSubscriptionInfo} from '../model/subscription';
import {TranslateService} from '@ngx-translate/core';
import {getLocalizedContent} from '../shared/subscription.service';
import {SubscriptionOwner} from '../model/reservation-info';

@Component({
  selector: 'app-basic-subscription-info',
  templateUrl: './basic-subscription-info.component.html',
  styleUrls: ['./basic-subscription-info.component.scss']
})
export class BasicSubscriptionInfoComponent {
  @Input()
  subscription: BasicSubscriptionInfo;
  @Input()
  owner?: SubscriptionOwner;

  @Input()
  cardLayout = true;

  constructor(private translateService: TranslateService) {}

  get title(): string {
    return getLocalizedContent(this.subscription.title, this.translateService.currentLang);
  }

  get description(): string {
    return getLocalizedContent(this.subscription.description, this.translateService.currentLang);
  }
}
