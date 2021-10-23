import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IWizData, IWizGroup, WizardEventBus, WizardEventTypes, } from 'ngx-mat-form-wizard';

@Component({
  selector: 'subscribing-events',
  templateUrl: './subscribing-events.page.html',
  styleUrls: ['./subscribing-events.page.scss']
})
export class SubscribingEvents implements OnDestroy {
    subscription: Subscription = new Subscription();

    groups: Array<IWizGroup> = [
        {
            id: "subscribing-events-example-group",
            style: "dashed",
            validation: {
                default: "This group has some issues",
            },
            events: true,       // remember to set the 'events' flag to true.
            containers: [
                {
                    fields: [
                        {   
                            type: "files",
                            id: "upload-files",
                            innerPlaceholder: "Search files...", 
                            validation: { 
                                maxItems: "Please provide up to 5 files only",
                                minItems: "Please provide at least 2 files",
                                maxTotalSize: "Total size of files cannot exceed 10MB",
                                required: "This field is required",
                            },                                      
                            hint: "Up to 10MB in total",                                      
                            maxTotalSize: 10000000,                                
                            multiple: true,  
                          //  accept: ".word, .pdf, .json, .gif, .html",                                   
                            minItems: 2,                                          
                            maxItems: 5,
                            events: true,       // remember to set the 'events' flag to true.
                            required: true,                                     
                        },
                    ]
                },
                {
                    fields: [
                        {
                            type: "void",
                            id: null
                        },
                        {
                            type: "void",
                            id: null
                        },
                        {
                            type: "button",
                            id: "subscribing-events-group-submitter",
                            placeholder: "Group submitter",
                            theme: "primary",
                            dosubmit: true,
                        },
                        
                    ]
                } 
            ]
        }
    ]

    constructor(
        private _wizardEventBus: WizardEventBus,
    ){
        // subscribing to the group events.
        this.subscription.add(this._wizardEventBus.subscribe("subscribing-events-example-group", WizardEventTypes.CHANGE, (event: IWizData) => {
            console.log("CHANGE event occurs every time one of the group's fields has changed its value. ", event);
        }))

        this.subscription.add(this._wizardEventBus.subscribe("subscribing-events-example-group", WizardEventTypes.VALIDATE, (event: IWizData) => {
            console.log("VALIDATE event occurs every time the group's value was validated. ", event);
        }))

        this.subscription.add(this._wizardEventBus.subscribe("subscribing-events-example-group", WizardEventTypes.SUBMIT, (event: IWizData) => {
            console.log("SUBMIT event occurs when the group successfully submitted. ", event);
        }))

        this.subscription.add(this._wizardEventBus.subscribe("subscribing-events-example-group", WizardEventTypes.UNSUBMIT, (event: IWizData) => {
            console.log("UNSUBMIT event occurs when the group failed to submit. ", event);
        }))

        // subscribing to the field events.
        this.subscription.add(this._wizardEventBus.subscribe("upload-files", WizardEventTypes.CHANGE, (event: IWizData) => {
            console.log("CHANGE event occurs every time the input field has changed its value. ", event);
        }))

        this.subscription.add(this._wizardEventBus.subscribe("upload-files", WizardEventTypes.SELECT, (event: IWizData) => {
            console.log("SELECT event occurs when a file is selected from the dropdown menu of the files input. ", event);
        }))

        this.subscription.add(this._wizardEventBus.subscribe("upload-files", WizardEventTypes.SEARCH, (event: IWizData) => {
            console.log("SEARCH event occurs when there is a change in the value of an inner search field. ", event);
        }))

        this.subscription.add(this._wizardEventBus.subscribe("upload-files", WizardEventTypes.TOGGLE, (event: IWizData) => {
            console.log("TOGGLE event occurs every time the input field has been toggled. ", event);
        }))

        this.subscription.add(this._wizardEventBus.subscribe("upload-files", WizardEventTypes.VALIDATE, (event: IWizData) => {
            console.log("VALIDATE event occurs every time the input field's value was validated. ", event);
        }))
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();    // remember to unsubscribe when the view is destroyed.
    }

    handleSubmit(groups: Array<IWizGroup>): void {
        console.log("The wizard has been successfully submitted :) ", groups);
    }

    handleUnsubmit(groups: Array<IWizGroup>): void {
        console.log("The wizard has been failed to submit :( ", groups);
    }

}
