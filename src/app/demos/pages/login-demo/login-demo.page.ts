import { Component, OnDestroy } from '@angular/core';
import { IWizGroup, WizardEventBus, WizardEventTypes, } from 'ngx-mat-form-wizard';
import { Subscription } from 'rxjs';

@Component({
  selector: 'login-demo',
  templateUrl: './login-demo.page.html',
  styleUrls: ['./login-demo.page.scss'],
})
export class LoginDemo implements OnDestroy {
    subscription: Subscription = new Subscription();

    groups: Array<IWizGroup> = [
        {
            id: "login-form-group",
            events: true,
            frameless: true,
            containers: [
                {
                    id: null,
                    fields: [
                        {
                            type: "content",
                            id: "login-form-header",
                            events: true,
                            value: `
                                <h2>Fill your details to login your account</h2>
                                <span style="font-size: 13px">
                                    don't have an account? 
                                    <strong wizard-clickable-element 
                                          style="color: #2032EA; 
                                          text-decoration: 
                                          underline; cursor: pointer">
                                        Register now
                                    </strong>
                                </span>
                            `
                        },
                    ]
                },
                {
                    id: null,
                    fields: [
                         {
                            type: "text",
                            id: "username",
                            placeholder: "User name",
                            minLength: 2,
                            validation: "Username must contain at least 2 characters.",
                            required: true
                        },
                    ] 
                },
                {
                    id: null,
                    fields: [
                        {
                            type: "email",
                            id: "user-email",
                            placeholder: "Email",
                            validation: "Email is invalid.",
                            required: true
                        },
                    ] 
                },
                {
                    id: null,
                    fields: [
                        {
                            type: "password",
                            id: "user-password",
                            placeholder: "Password",
                            validation: "password must be lowercase or numbers only, and 8-12 characters long.",
                            pattern: "[a-z0-9 ]*",
                            minLength: 8,
                            maxLength: 12,
                            required: true
                        },
                        
                    ] 
                },
                {
                    id: null,
                    fields: [
                        {
                            type: "checklist-multiple",
                            id: "remember-me",
                            items: [
                                { 
                                    id: 1, 
                                    name: `<strong style="font-size: 13px">
                                             Remember me
                                           </strong>`,
                                }
                            ],
                        },
                        
                    ]
                },
                {
                    id: null,
                    fields: [
                        {
                            type: "void",
                            id: null
                        },
                        {
                            type: "button",
                            id: "login-button",
                            placeholder: "Login",
                            theme: "primary",
                            dosubmit: true,
                        },
                        {
                            type: "void",
                            id: null
                        },
                    ]
                },
                {
                    id: null,
                    fields: [
                        {
                            type: "content",
                            id: "forgot-password",
                            events: true,
                            value: `
                            <div style="text-align: center">
                                <span wizard-clickable-element 
                                      style="font-size: 13px; 
                                      color: #2032EA; 
                                      text-decoration: 
                                      underline; 
                                      cursor: pointer">
                                    Forgot your password? 
                                </span>
                            </div>
                            `
                        },
                        
                    ]
                }
            ]
        }
    ];

    constructor(
        private _wizardEventBus: WizardEventBus
    ){
        this.subscription.add(this._wizardEventBus.subscribe("login-form-header", WizardEventTypes.CLICK, () => {
            alert("Move to registration form")
        }))

        this.subscription.add(this._wizardEventBus.subscribe("forgot-password", WizardEventTypes.CLICK, () => {
            alert("Move to restore password form")
        }))
        
        this.subscription.add(this._wizardEventBus.subscribe("login-form-group", WizardEventTypes.SUBMIT, () => {
            alert("Form successfully submitted!");
        }))

    }



    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}
