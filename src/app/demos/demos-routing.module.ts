import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DemosRoot } from './components/demos-root/demos-root.component';

import { Login } from './pages/login/login.page';
import { Registration } from './pages/registration/registration.page';
import { ValueMatch } from './pages/value-match/value-match.page';
import { LimitDates } from './pages/limit-dates/limit-dates.page';
import { RemoteSubmit } from './pages/remote-submit/remote-submit.page';
import { SubscribingEvents } from './pages/subscribing-events/subscribing-events.page';
import { RealTimeSearch } from './pages/real-time-search/real-time-search.page';
import { CustomValidations } from './pages/custom-validations/custom-validations.page';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '', component: DemosRoot, children:
        [
            { path: 'login', component: Login },
            { path: 'registration', component: Registration },
            { path: 'value-match', component: ValueMatch },
            { path: 'limit-dates', component: LimitDates },
            { path: 'remote-submit', component: RemoteSubmit },
            { path: 'subscribing-events', component: SubscribingEvents },
            { path: 'real-time-search', component: RealTimeSearch },
            { path: 'custom-validations', component: CustomValidations },
        ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemosRoutingModule { }
