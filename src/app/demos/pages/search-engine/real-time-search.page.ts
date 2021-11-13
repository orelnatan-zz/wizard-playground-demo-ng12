import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IWizGroup, WizardEventBus, WizardEventTypes, IWizData, IWizField, IWizItem } from 'ngx-mat-form-wizard';
import { Globus } from './services/globus.service';
import { LoremIpsum } from './services/lorem-ipsum.service';
import { Employees } from './services/employees.service';

@Component({
  selector: 'real-time-search',
  templateUrl: './real-time-search.page.html',
  styleUrls: ['./real-time-search.page.scss'],
  providers: [ Globus, LoremIpsum, Employees, ]
})
export class RealTimeSearch implements OnDestroy {
    subscription: Subscription = new Subscription();

    groups: Array<IWizGroup> = [
        {
            headline: "Select state and city",
            style: "dashed",
            containers: [
                {
                    fields: [
                        {
                            type: "autocomplete-single",
                            id: "select-state",
                            placeholder: "State",
                            innerPlaceholder: "Search a state...",
                            events: true,
                            items: [],
                            validation: {
                                required: "This field is required",
                            },
                            required: true
                        },
                        {
                            type: "autocomplete-single",
                            id: "select-city",
                            placeholder: "City",
                            innerPlaceholder: "Search a city...",
                            items: [],
                            validation: {
                                required: "This field is required",
                            },
                            required: true
                        },
                    ]
                },
            ]
        },
        {
            headline: "Select employees",
            style: "dashed",
            containers: [
                {
                    fields: [
                        {
                            type: "autocomplete-multiple",
                            id: "select-employees",
                            placeholder: "Select employees",
                            innerPlaceholder: "Search employees...",
                            hint: "Search for names prefixes such as: 'th', 'or', 'so', 'le'",
                            events: true,
                            validation: {
                                maxItems: "Please select up to 4 employees only",
                                minItems: "Please select at least 2 employees",
                                required: "This field is required", 
                            },
                            minItems: 2,
                            maxItems: 4,
                            required: true
                        },
                        {
                            type: "void",
                            id: null,
                        }
                    ]
                }
            ]
        },
        {
            headline: "Select lorem ipsums",
            style: "dashed",
            containers: [
                {
                    fields: [
                        {
                            type: "search",
                            id: "search-ipsums",
                            placeholder: "Search in lorem ipsum...",
                            hint: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
                            events: true
                        },
                        {
                            type: "void",
                            id: null,
                        }
                    ]
                },
                {
                    fields: [
                        {
                            type: "checklist-multiple",
                            id: "select-ipsums",
                            placeholder: "Select ipsums from the list below",
                            validation: {
                                maxItems: "Please select up to 6 ipsums only",
                                minItems: "Please select at least 3 ipsums",
                                required: "This field is required", 
                            },
                            minItems: 3,
                            maxItems: 6,
                            required: true
                        }
                    ]
                }
            ]
        }
    ];

    constructor(
        private _wizardEventBus: WizardEventBus,
        private _globus: Globus,
        private _loremIpsum: LoremIpsum,
        private _employees: Employees
    ){
        this.subscription.add(this._wizardEventBus.subscribe("select-state", WizardEventTypes.SEARCH, (event: IWizData) => {
            this.handleStateSearch(event);
        }))      

        this.subscription.add(this._wizardEventBus.subscribe("select-state", WizardEventTypes.CHANGE, (event: IWizData) => {           
            this.handleStateChanged(event);
        }))

        this.subscription.add(this._wizardEventBus.subscribe("select-employees", WizardEventTypes.SEARCH, (event: IWizData) => {
            this.handleEmployeesSearch(event);
        }))      

        this.subscription.add(this._wizardEventBus.subscribe("search-ipsums", WizardEventTypes.CHANGE, (event: IWizData) => {
            this.handleIpsumsChanged(event);
        }))
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    handleStateSearch(event: IWizData): void {
        event.field.pending = true;     

        this._globus.getStatesByKeyword(event.content).subscribe((response: Array<IWizItem>) => {
            event.field.items = response;     

            event.field.pending = false;
        })
    }

    handleStateChanged(event: IWizData): void {
        const cities: IWizField = this.groups[0].containers[0].fields[1];   // get the city select field config object.
        const name: string = event.field.items.find(
            state => state.id == event.content).name;    // find the state name by the selected id.        
        
        cities.items = [];            // reset the field items. 
        cities.selected = null;          
        cities.pending = true;         
        this._globus.getCitiesByStateName(name).subscribe((response: Array<IWizItem>) => {
            cities.items = response;          
            
            cities.pending = false;
        })
    }

    handleEmployeesSearch(event: IWizData): void {
        event.field.pending = true;     

        this._employees.getEmployeesByKeyword(event.content).subscribe((response: Array<IWizItem>) => {
            event.field.items = response;     

            event.field.pending = false;
        })
    }

    handleIpsumsChanged(event: IWizData): void {
        const checklist: IWizField = this.groups[2].containers[1].fields[0];    // get the ipsums checklist field config object.

        event.field.pending = true;
        this._loremIpsum.getIpsumsByKeyword(event.content).subscribe((response: Array<IWizItem>) => {
            checklist.items = response;     

            event.field.pending = false;
        })
    }
    
    handleSubmit(groups: Array<IWizGroup>): void {
        console.log(groups)
        alert("Form successfully submitted!");
    }

}
