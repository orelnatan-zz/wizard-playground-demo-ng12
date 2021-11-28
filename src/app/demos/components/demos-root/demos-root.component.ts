import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IWizData, IWizGroup, WizardEventBus, WizardEventTypes, } from 'ngx-mat-form-wizard'; 

import * as demos from '../../../../assets/data/demos.json';

const ROUTES: {[key: string]: any} = {
    1: "/demos/login",
    2: "/demos/registration",
    3: "/demos/value-match",
    4: "/demos/handle-dates",
    5: "/demos/remote-submit",
    6: "/demos/subscribing-events",
    7: "/demos/real-time-search",
    8: "/demos/custom-validations"
}

@Component({
  selector: 'demos-root',
  templateUrl: './demos-root.component.html',
  styleUrls: ['./demos-root.component.scss']
})
export class DemosRoot implements OnInit {
    groups: Array<IWizGroup> = [];

    constructor(
        private _wizardEventBus: WizardEventBus,
        private _activatedRoute: ActivatedRoute,
        private _router: Router
    ){
        this._wizardEventBus.subscribe("demo-selection-dropdown", WizardEventTypes.CHANGE, (event: IWizData) => {  
            this._router.navigate([ROUTES[event.content]], {
                queryParams: {
                    demo: event.content
                }
            });
        });
    }

    ngOnInit(): void {
        this._activatedRoute.queryParams.subscribe((params: Params): void => {
            this.groups = [
                {
                    id: "demo-selection-group",
                    frameless: true,
                    containers: [
                        {
                            id: null,
                            fields: [
                                {
                                    type: "single-select",
                                    id: "demo-selection-dropdown",
                                    selected: parseInt(params.demo) || 1,
                                    events: true,
                                    items: demos.items
                                }
                            ]
                        }
                    ]
                }
            ];
        }) 
    }


    
}
