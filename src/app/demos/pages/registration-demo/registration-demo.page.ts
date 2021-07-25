import { Component, OnDestroy } from '@angular/core';
import { IWizGroup, WizardEventBus, WizardEventTypes, IWizData, IWizField } from 'ngx-mat-form-wizard';
import { Subscription } from 'rxjs';

import * as banks from '../../../../assets/data/banks.json';

@Component({
  selector: 'registration-demo',
  templateUrl: './registration-demo.page.html',
  styleUrls: ['./registration-demo.page.scss'],
})
export class RegistrationDemo implements OnDestroy {
    subscription: Subscription = new Subscription();

    groups: Array<IWizGroup> = [
        {
            frameless: true,
            containers: [
                {
                    id: null,
                    fields: [
                        {
                            type: "content",
                            id: "registration-form-header",
                            events: true,
                            value: `
                                <h2>Register new account</h2>
                                <span style="font-size: 13px">
                                    already have an account? 
                                    <strong wizard-clickable-element 
                                          style="color: #2032EA; 
                                          text-decoration: 
                                          underline; cursor: pointer">
                                        Login now
                                    </strong>
                                </span>
                            `
                        },
                    ]
                },
            ]
        },
        {
            id: "personal-details",
            style: "dashed",
            headline: "Personal Details",
            containers: [
                {
                    id: "full-name",
                    fields: [
                        {
                            type: "text",
                            id: "first-name",
                            placeholder: "First name",
                            validation: "This field is required",
                            required: true
                        },
                        {
                            type: "text",
                            id: "middle-name",
                            placeholder: "Middle name",
                        },
                        {
                            type: "text",
                            id: "last-name",
                            placeholder: "Last name",
                            validation: "This field is required",
                            required: true
                        },
                    ]
                },
                {
                    id: "id-and-birth-date",
                    fields: [
                        {
                            type: "date",
                            id: "birth-date",
                            placeholder: "Birth date",
                            maxDate: new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate()),
                            hint: "You must be at least 18 years old",
                            validation: "This field is required",
                            required: true
                        },
                        {
                            type: "number",
                            id: "id-number",
                            placeholder: "ID number",
                            validation: "This field is required",
                            minLength: 9,
                            maxLength: 10,
                            required: true
                        },
                        {
                            type: "number",
                            id: "phone-number",
                            placeholder: "Phone number",
                            validation: "This field is required",
                            minLength: 9,
                            maxLength: 10,
                            required: true
                        }
                    ]
                },
                {
                    id: "gender-and-status",
                    fields: [
                        {
                            type: "checklist-single",
                            id: "user-gender",
                            placeholder: "Gender",
                            validation: "This field is required",
                            required: true,
                            items: [
                                { 
                                    id: 0, 
                                    name: `Male`,
                                },
                                { 
                                    id: 1, 
                                    name: `Female`,
                                }
                            ],
                        },
                        {
                            type: "checklist-single",
                            id: "user-status",
                            placeholder: "Status",
                            validation: "This field is required",
                            required: true,
                            items: [
                                { 
                                    id: 0, 
                                    name: `Single`,
                                },
                                { 
                                    id: 1, 
                                    name: `Married`,
                                },
                                { 
                                    id: 2, 
                                    name: `Widower`,
                                },
                                { 
                                    id: 3, 
                                    name: `Divorced`,
                                }
                            ],
                        },
                        {
                            type: "void",
                            id: null
                        }
                    ]
                }
            ]
        },
        {
            id: "bank-and-address",
            headline: "Bank & Address",
            style: "dashed",
            containers: [
                {
                    id: null,
                    fields: [
                        {
                            type: "autocomplete-single",
                            id: "user-bank",
                            placeholder: "Bank",
                            items: banks.items,
                            validation: "This field is required",
                            required: true
                        },
                        {
                            type: "number",
                            id: "bank-account-number",
                            placeholder: "Bank account number",
                            validation: "This field is required",
                            minLength: 7,
                            maxLength: 12,
                            required: true
                        },
                    ]
                },
                {
                    id: "state-and-city",
                    fields: [
                        {
                            type: "autocomplete-single",
                            id: "user-state",
                            placeholder: "State",
                            events: true,
                            items: [],
                            validation: "This field is required",
                            required: true
                        },
                        {
                            type: "autocomplete-single",
                            id: "user-city",
                            placeholder: "City",
                            items: [],
                            validation: "This field is required",
                            required: true
                        },
                    ]
                },
                {
                    id: null,
                    fields: [
                        {
                            type: "text",
                            id: "street-name",
                            placeholder: "Street",
                            validation: "This field is required",
                            required: true
                        },
                        {
                            type: "number",
                            id: "house-number",
                            placeholder: "House number",
                        },
                        {
                            type: "number",
                            id: "floor-number",
                            placeholder: "Floor number",
                        },
                    ]
                }
            ]
        },
        {
            id: "set-password",
            headline: "Set Password",
            style: "dashed",
            containers: [
                {
                    id: null,
                    fields: [
                        {
                            type: "password",
                            id: "origin-password",
                            placeholder: "Password",
                            hint: "Password must be lowercase or numbers only, and 8-12 characters long.",
                            validation: "Password is invalid",
                            matchTo: "repeat-password",
                            pattern: "[a-z0-9 ]*",
                            minLength: 8,
                            maxLength: 12,
                            required: true
                        },
                        {
                            type: "password",
                            id: "repeat-password",
                            placeholder: "Repeat password",
                            validation: "Password doesn't match, or invalid",
                            matchWith: "origin-password",
                            required: true
                        },
                    ]
                }
            ]
        }
    ];

    constructor(
        private _wizardEventBus: WizardEventBus
    ){
        this.subscription.add(this._wizardEventBus.subscribe("registration-form-header", WizardEventTypes.CLICK, () => {
            alert("Move to login page")
        }))

        this.subscription.add(this._wizardEventBus.subscribe("user-state", WizardEventTypes.SEARCH, (event: IWizData) => {
            
        }))

        this.subscription.add(this._wizardEventBus.subscribe("user-state", WizardEventTypes.CHANGE, (event: IWizData) => {
            const cityDropdown: IWizField = this.groups[2].containers[1].fields[1];

            cityDropdown.pending = true;
            cityDropdown.selected = null;

        }))
    }



    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}
