
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxMatFormWizardModule } from 'ngx-mat-form-wizard';
import { DemosRoutingModule } from './demos-routing.module';

import { DemosRoot } from './components/demos-root/demos-root.component';
import { Navbar } from './components/nav-bar/nav-bar.component';
import { GithubLink } from './components/github-link/github-link.component';

import { Login } from './pages/login/login.page';
import { Registration } from './pages/registration/registration.page';
import { ValueMatch } from './pages/value-match/value-match.page';
import { HandleDates } from './pages/handle-dates/handle-dates.page';
import { RemoteSubmit } from './pages/remote-submit/remote-submit.page';
import { SubscribingEvents } from './pages/subscribing-events/subscribing-events.page';
import { RealTimeSearch } from './pages/real-time-search/real-time-search.page';
import { CustomValidations } from './pages/custom-validations/custom-validations.page';

@NgModule({
  declarations: [
    DemosRoot,
    Navbar,
    GithubLink,
    Login,
    Registration,
    ValueMatch,
    HandleDates,
    RemoteSubmit,
    SubscribingEvents,
    RealTimeSearch,
    CustomValidations
  ],
  imports: [
    HttpClientModule,
    DemosRoutingModule,
    NgxMatFormWizardModule,
  ],
  providers: [],
})
export class DemosModule {}
