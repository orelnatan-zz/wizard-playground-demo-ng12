import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IWizGroup, IWizData, WizardEventBus, WizardEventTypes, } from 'ngx-mat-form-wizard';

@Component({
  selector: 'login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class Login implements OnDestroy {
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
                            value: `
                                <h2>Fill your details to login your account</h2>
                                <span style="font-size: 13px">
                                    don't have an account? 
                                    <strong id="register-now-link"
                                          style="color: #2032EA; 
                                          text-decoration: underline;
                                          cursor: pointer">
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
                            validation: {
                                minLength: "Username should include at least 2 characters",
                                required: "This field is required"
                            },
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
                            validation: {
                                email: "Invalid email address",
                                required: "This field is required"
                            },
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
                            validation: {
                                pattern: "Password must be lowercase or numbers only",
                                minLength: "Password can not be less than 8 characters long",
                                maxLength: "Password can not be more than 12 characters long",
                                required: "Password is required",
                            },
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
                            value: `
                                <div style="text-align: center">
                                    <span id="forgot-password-link" 
                                        style="font-size: 13px; 
                                        color: #2032EA; 
                                        text-decoration: underline; 
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
        this.subscription.add(this._wizardEventBus.subscribe("register-now-link", WizardEventTypes.CLICK, (event: IWizData) => {
            alert("Move to registration page")
        }))

        this.subscription.add(this._wizardEventBus.subscribe("forgot-password-link", WizardEventTypes.CLICK, (event: IWizData) => {
            alert("Move to restore password page")
        }))
        
        this.subscription.add(this._wizardEventBus.subscribe("login-form-group", WizardEventTypes.SUBMIT, (event: IWizData) => {
            alert("Form successfully submitted!");
        }))
    }
    
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}
