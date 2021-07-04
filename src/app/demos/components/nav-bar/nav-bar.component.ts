import { Component, Input } from '@angular/core';
import { IWizGroup } from 'ngx-mat-form-wizard';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class Navbar {
    @Input() groups: Array<IWizGroup> = []


}
