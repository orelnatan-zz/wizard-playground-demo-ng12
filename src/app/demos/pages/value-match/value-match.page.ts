import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IWizGroup, WizardEventBus, WizardEventTypes, IWizData, } from 'ngx-mat-form-wizard';

@Component({
  selector: 'value-match',
  templateUrl: './value-match.page.html',
  styleUrls: ['./value-match.page.scss'],
})
export class ValueMatch implements OnDestroy {
    subscription: Subscription = new Subscription();
    
    groups: Array<IWizGroup> = [
        {
            headline: "Number Match",
            id: "id-match",
            style: "dashed",
            events: true,
            containers: [
                {
                    fields: [
                        {
                            type: "number",
                            id: "id-field-org",
                            placeholder: "ID",
                            hint: "provide your ID",
                            validation: {
                                pattern: "ID should include 9 digits",
                                required: "This field is required",
                            },
                            pattern: "([0-9]{9})",
                            matchTo: "id-field-repeat",
                            required: true
                        },
                        {
                            type: "number",
                            id: "id-field-repeat",
                            placeholder: "Repeat ID",
                            hint: "repeat the ID",
                            validation: {
                                required: "This field is required",
                                requireMatch: "ID doesn't match",
                            },
                            matchWith: "id-field-org",
                            required: true
                        },
                    ]
                },
                {
                    fields: [
                        {
                            type: "void",
                            id: null,
                        },
                        {
                            type: "void",
                            id: null,
                        },
                        {
                            type: "button",
                            id: "id-match-submit",
                            placeholder: "Submit",
                            theme: "primary",
                            dosubmit: true,
                        },
                    ]
                }
            ]
        },
        {
            headline: "Email Match",
            id: "email-match",
            style: "dashed",
            events: true,
            containers: [
                {
                    fields: [
                        {
                            type: "email",
                            id: "email-field-org",
                            placeholder: "Email",
                            hint: "provide email address",
                            validation: { 
                                email: "Invalid email address",
                                required: "This field is required"
                            },
                            matchTo: "email-field-repeat",
                            required: true
                        },
                        {
                            type: "email",
                            id: "email-field-repeat",
                            placeholder: "Repeat address",
                            hint: "repeat the address",
                            validation: {
                                required: "This field is required",
                                email: "Invalid email address",
                                requireMatch: "Address doesn't match",
                            },
                            matchWith: "email-field-org",
                            required: true
                        },
                    ]
                },
                {
                    fields: [
                        {
                            type: "void",
                            id: null,
                        },
                        {
                            type: "void",
                            id: null,
                        },
                        {
                            type: "button",
                            id: "email-match-submit",
                            placeholder: "Submit",
                            theme: "primary",
                            dosubmit: true,
                        },
                    ]
                }
            ]
        },
        {
            headline: "Text Match",
            id: "name-match",
            style: "dashed",
            events: true,
            containers: [
                {
                    fields: [
                        {
                            type: "text",
                            id: "name-field-org",
                            placeholder: "Name",
                            hint: "provide a name",
                            validation: { 
                                maxLength: "Name should include up to 8 characters",
                                minLength: "Name should include at least 2 characters",
                                pattern: "Use upper/lower case letters only",
                                required: "This field is required"
                            },
                            matchTo: "name-field-repeat",
                            pattern: "[a-zA-Z ]*",
                            minLength: 2,
                            maxLength: 8,
                            required: true
                        },
                        {
                            type: "text",
                            id: "name-field-repeat",
                            placeholder: "Repeat name",
                            hint: "repeat the name",
                            validation: {
                                required: "This field is required",
                                requireMatch: "Name doesn't match",
                            },
                            matchWith: "name-field-org",
                            required: true
                        },
                    ]
                },
                {
                    fields: [
                        {
                            type: "void",
                            id: null,
                        },
                        {
                            type: "void",
                            id: null,
                        },
                        {
                            type: "button",
                            id: "name-match-submit",
                            placeholder: "Submit",
                            theme: "primary",
                            dosubmit: true,
                        },
                    ]
                }
            ]
        },
        {
            headline: "Password Match",
            id: "password-match",
            style: "dashed",
            events: true,
            containers: [
                {
                    fields: [
                        {
                            type: "password",
                            id: "password-field-org",
                            placeholder: "Password",
                            hint: "enter a password",
                            validation: {
                                pattern: "Password must be lowercase or numbers only",
                                minLength: "Password can not be less than 8 characters long",
                                maxLength: "Password can not be more than 12 characters long",
                                required: "This field is required",
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
                            placeholder: "Repeat Password",
                            hint: "repeat the password",
                            validation: {
                                required: "This field is required",
                                requireMatch: "Password doesn't match",
                            },
                            matchWith: "password-field-org",
                            required: true
                        },
                    ]
                },
                {
                    fields: [
                        {
                            type: "void",
                            id: null,
                        },
                        {
                            type: "void",
                            id: null,
                        },
                        {
                            type: "button",
                            id: "password-match-submit",
                            placeholder: "Submit",
                            theme: "primary",
                            dosubmit: true,
                        },
                    ]
                }
            ]
        }
    ];

    constructor(
        private _wizardEventBus: WizardEventBus
    ){
        this.subscription.add(this._wizardEventBus.subscribe("id-match", WizardEventTypes.SUBMIT, (event: IWizData) => {
            alert("The two ID's are matched!")
        }))

        this.subscription.add(this._wizardEventBus.subscribe("email-match", WizardEventTypes.SUBMIT, (event: IWizData) => {
            alert("The two emails are matched!")
        }))

        this.subscription.add(this._wizardEventBus.subscribe("name-match", WizardEventTypes.SUBMIT, (event: IWizData) => {
            alert("The two names are matched!")
        }))

        this.subscription.add(this._wizardEventBus.subscribe("password-match", WizardEventTypes.SUBMIT, (event: IWizData) => {
            alert("The two passwords are matched!")
        }))
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}