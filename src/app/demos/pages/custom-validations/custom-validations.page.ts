import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { IWizData, IWizGroup, WizardEventBus, WizardEventTypes, } from 'ngx-mat-form-wizard';
import { countFilledValuesValidator } from './validators/count-filled-values.validator';

import * as moment from 'moment';                           // https://www.npmjs.com/package/angular2-moment
import * as isIpAddress from 'is-ip';                       // https://www.npmjs.com/package/is-ip
import * as isIsraeliId from 'israeli-id-validator';        // https://www.npmjs.com/package/israeli-id-validator

@Component({
  selector: 'introduction',
  templateUrl: './custom-validations.page.html',
  styleUrls: ['./custom-validations.page.scss']
})
export class CustomValidations {
    subscription: Subscription = new Subscription();
    
    groups: Array<IWizGroup> = [
        {
            id: "fill-two-fields-group",  
            headline: "Choose two fields to fill up",
            style: "dashed",
            events: true,                    
            validation: { 
                custom: "This group requires exactly two fields to be filled",
                default: "This group has some issues"
            },                      
            containers: [   
                {
                    id: "name-and-email",
                    fields: [
                        {
                            type: "text",
                            id: "user-full-name",
                            placeholder: "Username",
                            pattern: "[a-zA-Z ]*",
                            minLength: 2,
                            maxLength: 8,
                            validation: { 
                                maxLength: "Username should include up to 8 characters",
                                minLength: "Username should include at least 2 characters",
                                pattern: "Use upper/lower case letters only"
                            },
                        },
                        {
                            type: "email",
                            id: "user-email",
                            placeholder: "Email",
                            validation: {
                                email: "Invalid email address",
                            },
                        },
                    ]
                },
                {
                    id: "ip-address-and-israeli-id",
                    fields: [
                        {
                            type: "text",
                            id: "user-ip-address",               
                            placeholder: "Enter your IP address",
                            events: true,                         
                            validation: {
                                custom: "Wrong IP address",
                                required: "This field is required"
                            },
                            // Or by using pattern:
                            // pattern: "([0-9]{3}).([0-9]{3}).([0-9]{2}).([0-9]{3})"                  
                        },
                        {
                            type: "number",
                            id: "user-israeli-id",               
                            placeholder: "Enter israeli ID",
                            events: true,                         
                            validation: {
                                custom: "Wrong israeli ID",
                                required: "This field is required"
                            },                  
                        },
                    ]
                },
                {
                    id: "birthdate-and-docs",
                    fields: [
                        {
                            type: "date",
                            id: "user-birthdate",
                            placeholder: "Birthdate",
                            hint: "Verify that you are older than 18 years old",
                            maxDate: moment(moment().subtract(18, "year")).format("YYYY-MM-DD")
                        },
                        {   
                            type: "files",
                            id: "user-docs", 
                            validation: { 
                                maxItems: "Please provide up to 5 files only",
                                minItems: "Please provide at least 2 files",
                            },                                      
                            hint: "Up to 5MB per file.",                                      
                            maxFileSize: 5000000,
                         //   accept: ".scss, .svg, .json, .gif, .html",                                      
                            multiple: true,                                     
                            minItems: 2,                                          
                            maxItems: 5,
                            files: []                                       
                        },
                    ]
                },
            ]
        },
    ]

    constructor(
        private _wizardEventBus: WizardEventBus,
    ){
        this._wizardEventBus.subscribe("fill-two-fields-group", WizardEventTypes.VALIDATE, (event: IWizData) => {
            event.content.invalid = !countFilledValuesValidator(event.ngForm.form, 2) && event.ngForm.submitted;
        });

        this._wizardEventBus.subscribe("user-ip-address", WizardEventTypes.VALIDATE, (event: IWizData) => {            
            event.content.invalid = !isIpAddress(String(event.field.value));
        });

        this._wizardEventBus.subscribe("user-israeli-id", WizardEventTypes.VALIDATE, (event: IWizData) => {
            event.content.invalid = !isIsraeliId(event.field.value);
        });
    }

    handleSubmit(groups: Array<IWizGroup>): void {
        alert("Form successfully submitted!");
    }
    
}
