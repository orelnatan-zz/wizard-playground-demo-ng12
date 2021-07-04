
import { NgModule } from '@angular/core';
import { NgxMatFormWizardModule } from 'ngx-mat-form-wizard';
import { DemosRoutingModule } from './demos-routing.module';

import { DemosRoot } from './components/demos-root/demos-root.component';
import { Navbar } from './components/nav-bar/nav-bar.component';

import { IntroductionDemo } from './pages/introduction-demo/introduction-demo.page';
import { LoginDemo } from './pages/login-demo/login-demo.page';

@NgModule({
  declarations: [
    DemosRoot,
    Navbar,
    IntroductionDemo,
    LoginDemo,
  ],
  imports: [
    DemosRoutingModule,
    NgxMatFormWizardModule,
  ],
  providers: [],
})
export class DemosModule {}
