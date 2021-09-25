import { Component, ViewChild } from '@angular/core';
import { IWizGroup, NgxMatFormWizard } from 'ngx-mat-form-wizard';
//import { IWizData, IWizGroup, WizardEventBus, WizardEventTypes, } from 'projects/ngx-mat-form-wizard/src/public-api';

@Component({
  selector: 'remote-submit',
  templateUrl: './remote-submit.page.html',
  styleUrls: ['./remote-submit.page.scss']
})
export class RemoteSubmit {
    @ViewChild(NgxMatFormWizard, { static: false }) ngxMatFormWizard: NgxMatFormWizard;

    groups: Array<IWizGroup> = [
        {
            headline: "Application Form",
            containers: [
                {
                    fields: [
                        {
                            type: "text",
                            id: "full-name",
                            placeholder: "Full name",
                            validation: { 
                                maxLength: "Name should include up to 12 characters",
                                minLength: "Name should include at least 2 characters",
                                pattern: "Use upper/lower case letters only",
                                required: "This field is required",
                            },
                            pattern: "[a-zA-Z ]*",
                            minLength: 2,
                            maxLength: 12,
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
                        },
                        {
                            type: "date",
                            id: "application-date",
                            placeholder: "Application date",
                            maxDate: new Date(),
                            validation: {
                                required: "This field is required",
                            },
                            required: true
                        },
                    ]
                },
                {
                    fields: [
                        {
                            type: "textarea",
                            id: "textarea-field",
                            placeholder: "Application comments",
                            rows: 7,
                            required: true,
                            minLength: 20,
                            maxLength: 400,
                            validation: { 
                                maxLength: "Comments should include up to 400 characters",
                                minLength: "Comments should include at least 20 characters",
                                required: "this field is required",
                            },
                        }
                    ]
                }
            ]
        }
    ]
    
    usingViewChildReference(): void {
        this.ngxMatFormWizard.remoteSubmit();
    }

    bySendingTemplateReference(reference: NgxMatFormWizard): void {
        reference.remoteSubmit();
    }

    handleSubmit(groups: Array<IWizGroup>): void {
        alert("Form successfully submitted :)");
    }

    handleUnsubmit(groups: Array<IWizGroup>): void {
        alert("Form failed to submit :(");
    }

}
