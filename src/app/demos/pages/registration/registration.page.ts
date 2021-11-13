import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IWizGroup, WizardEventBus, WizardEventTypes, IWizData, } from 'ngx-mat-form-wizard';

import * as banks from '../../../../assets/data/banks.json';
import * as states from '../../../../assets/data/states.json';

@Component({
  selector: 'registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class Registration implements OnDestroy {
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
                            value: `
                                <h2>Register new account</h2>
                                <span style="font-size: 13px">
                                    already have an account? 
                                    <strong id="login-new-link"
                                          style="color: #2032EA; 
                                          text-decoration: underline;
                                          cursor: pointer">
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
            validation: {
                default: "This group has some issues",
            },
            headline: "Personal Details",
            containers: [
                {
                    id: "full-name",
                    fields: [
                        {
                            type: "text",
                            id: "first-name",
                            placeholder: "First name",
                            validation: { 
                                maxLength: "First name should include up to 8 characters",
                                minLength: "First name should include at least 2 characters",
                                pattern: "Use upper/lower case letters only"
                            },
                            pattern: "[a-zA-Z ]*",
                            minLength: 2,
                            maxLength: 8,
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
                            validation: {
                                required: "This field is required",
                            },
                            required: true
                        },
                    ]
                },
                {
                    id: "id-phone-and-birth-date",
                    fields: [
                        {
                            type: "date",
                            id: "birth-date",
                            placeholder: "Birth date",
                            maxDate: new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate()),
                            hint: "You must be at least 18 years old",
                            validation: {
                                required: "This field is required",
                            },
                            required: true
                        },
                        {
                            type: "number",
                            id: "id-number",
                            placeholder: "ID number",
                            validation: {
                                pattern: "ID should include 9 digits",
                                required: "This field is required",
                            },
                            pattern: "([0-9]{9})",
                            required: true
                        },
                        {
                            type: "number",
                            id: "phone-number",
                            placeholder: "Phone number",
                            validation: {
                                pattern: "Phone should include 8 - 10 digits",
                                required: "This field is required",
                            },
                            pattern: "([0-9]{8,10})",
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
                            validation: {
                                required: "This field is required",
                            },
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
                            validation: {
                                required: "This field is required",
                            },
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
            validation: {
                default: "This group has some issues",
            },
            containers: [
                {
                    id: "bank-details",
                    fields: [
                        {
                            type: "autocomplete-single",
                            id: "user-bank",
                            placeholder: "Bank",
                            items: banks.items,
                            validation: {
                                required: "This field is required",
                            },
                            required: true
                        },
                        {
                            type: "number",
                            id: "bank-account-number",
                            placeholder: "Bank account number",
                            validation: {
                                pattern: "Account number should include 8 - 12 digits",
                                required: "This field is required",
                            },
                            pattern: "([0-9]{8,12})",
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
                            innerPlaceholder: "Find countries...",
                            events: true,
                            items: states.items,
                            validation: {
                                required: "This field is required",
                            },
                            required: true
                        },
                        {
                            type: "text",
                            id: "user-city",
                            placeholder: "City",
                            validation: { 
                                minLength: "City name should include at least 2 characters",
                                required: "This field is required",
                                pattern: "Use upper/lower case letters only"
                            },
                            pattern: "[a-zA-Z ]*",
                            minLength: 2,
                            required: true
                        },
                    ]
                },
                {
                    id: "address-details",
                    fields: [
                        {
                            type: "text",
                            id: "street-name",
                            placeholder: "Street",
                            validation: {
                                required: "This field is required",
                            },
                            required: true
                        },
                        {
                            type: "number",
                            // Default pattern:
                            // pattern: "[0-9 ]*"
                            id: "house-number",
                            placeholder: "House number",
                            
                        },
                        {
                            type: "number",
                            // Default pattern:
                            // pattern: "[0-9 ]*"
                            id: "floor-number",
                            placeholder: "Floor number",
                        },
                    ]
                }
            ]
        },
        {
            id: "set-password",
            headline: "Create Password",
            style: "dashed",
            validation: {
                default: "This group has some issues",
            },
            containers: [
                {
                    id: "terms-and-conditions",
                    fields: [
                        {
                            type: "checklist-multiple",
                            id: "accept-terms-and-conditions",
                            validation: {
                                required: "You must accept terms and conditions",
                            },
                            required: true,
                            items: [
                                { 
                                    id: 1, 
                                    name: `
                                        Accept our
                                        <strong id="terms-and-conditions-link" 
                                              style="color: #2032EA;
                                              text-decoration: underline; 
                                              cursor: pointer;">
                                            terms and conditions 
                                        </strong>
                                        before sign-in.
                                    `
                                }
                            ],
                        },
                        
                    ]
                },
                {
                    id: "password-config",
                    fields: [
                        {
                            type: "password",
                            id: "password-field-org",
                            placeholder: "Password",
                            hint: "Enter a password",
                            validation: {
                                pattern: "Password must be lowercase or numbers only",
                                minLength: "Password can not be less than 8 characters long",
                                maxLength: "Password can not be more than 12 characters long",
                                required: "Password is required",
                            },
                            matchTo: "password-field-repeat",
                            pattern: "[a-z0-9 ]*",
                            minLength: 8,
                            maxLength: 12,
                            required: true
                        },
                        {
                            type: "password",
                            id: "password-field-repeat",
                            placeholder: "Password Repeat",
                            hint: "Repeat the password",
                            validation: {
                                required: "Password is required",
                                requireMatch: "Password doesn't match",
                            },
                            matchWith: "password-field-org",
                            required: true
                        },
                    ]
                }, 
            ]
        }
    ];

    constructor(
        private _wizardEventBus: WizardEventBus,
    ){
        this.subscription.add(this._wizardEventBus.subscribe("terms-and-conditions-link", WizardEventTypes.CLICK, (event: IWizData) => {
            alert("Show terms and conditions policy")
        }))

        this.subscription.add(this._wizardEventBus.subscribe("login-new-link", WizardEventTypes.CLICK, (event: IWizData) => {
            alert("Move to login page")
        }))
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    handleSubmit(groups: Array<IWizGroup>): void {
        alert("Form successfully submitted!");
    }
    
}
