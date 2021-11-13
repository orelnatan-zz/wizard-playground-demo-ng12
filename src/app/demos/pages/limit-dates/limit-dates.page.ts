import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IWizGroup, IWizData, WizardEventBus, WizardEventTypes, } from 'ngx-mat-form-wizard';

import * as moment from 'moment';       // https://www.npmjs.com/package/angular2-moment

@Component({
  selector: 'limit-dates',
  templateUrl: './limit-dates.page.html',
  styleUrls: ['./limit-dates.page.scss'],
})
export class LimitDates implements OnDestroy {
    subscription: Subscription = new Subscription();

    groups: Array<IWizGroup> = [
        {
            headline: "Using simple strings",
            id: "simple-strings",
            style: "dashed",
            validation: {
                default: "You are missing a date"
            },
            events: true,
            containers: [
                {
                    fields: [
                        {
                            type: "date",
                            id: "simple-strings-calendar-1",
                            placeholder: "Select date",
                            hint: "Between 15/6/2005 to 20/11/2016",
                            validation: {
                                required: "This field is required",
                            },
                            minDate: "2005-06-15",
                            maxDate: "2016-11-20",
                            required: true
                        },
                        {
                            type: "date",
                            id: "simple-strings-calendar-2",
                            placeholder: "Select date",
                            hint: "From 1/3/2013",
                            validation: {
                                required: "This field is required",
                            },
                            date: "2014-01-01",
                            minDate: "2013-03-01",
                            required: true
                        },
                        {
                            type: "date",
                            id: "simple-strings-calendar-3",
                            placeholder: "Select date",
                            hint: "Until 15/10/2018",
                            validation: {
                                required: "This field is required",
                            },
                            maxDate: "2018-10-15",
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
                            id: "simple-strings-submit",
                            placeholder: "Submit",
                            theme: "primary",
                            dosubmit: true,
                        },
                    ]
                }
            ]
        },
        {
            headline: "Using Moment objects",
            id: "moment-objects",
            style: "dashed",
            validation: {
                default: "You are missing a date"
            },
            events: true,
            containers: [
                {
                    fields: [
                        {
                            type: "date",
                            id: "moment-objects-calendar-1",
                            placeholder: "Select date",
                            hint: "Between 1/1/2003 to 25/07/2010",
                            validation: {
                                required: "This field is required",
                            },
                            minDate: moment("2003-01-1", "YYYY-MM-DD").format(),
                            maxDate: moment("2010-07-25", "YYYY-MM-DD").format(),
                            required: true
                        },
                        {
                            type: "date",
                            id: "moment-objects-calendar-2",
                            placeholder: "Select date",
                            hint: "From 1/5/2012",
                            validation: {
                                required: "This field is required",
                            },
                            date: moment(moment().subtract(1, "year")).format("YYYY-MM-DD"),
                            minDate: moment("2012-05-1", "YYYY-MM-DD").format(),
                            required: true
                        },
                        {
                            type: "date",
                            id: "moment-objects-calendar-3",
                            placeholder: "Select date",
                            hint: "Until today",
                            validation: {
                                required: "This field is required",
                            },
                            maxDate: moment().format("YYYY-MM-DD"),
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
                            id: "moment-objects-submit",
                            placeholder: "Submit",
                            theme: "primary",
                            dosubmit: true,
                        },
                    ]
                }
            ]
        },
        {
            headline: "Using JS objects",
            id: "js-objects",
            style: "dashed",
            validation: {
                default: "You are missing a date"
            },
            events: true,
            containers: [
                {
                    fields: [
                        {
                            type: "date",
                            id: "js-objects-calendar-1",
                            placeholder: "Select date",
                            hint: "Between 5/5/1991 to 25/10/2010",
                            validation: {
                                required: "This field is required",
                            },
                            minDate: new Date(1991, 4, 5),
                            maxDate: new Date(2010, 9, 25),
                            required: true
                        },
                        {
                            type: "date",
                            id: "js-objects-calendar-2",
                            placeholder: "Select date",
                            hint: "From 5/1/2015",
                            validation: {
                                required: "This field is required",
                            },
                            date: new Date(new Date().getFullYear() - 2, 6, 5),
                            minDate: new Date("Tue Jan 05 2015"),
                            required: true
                        },
                        {
                            type: "date",
                            id: "js-objects-calendar-3",
                            placeholder: "Select date",
                            hint: "Until 5/7/2030",
                            validation: {
                                required: "This field is required",
                            },
                            maxDate: new Date(2030, 6, 5),
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
                            id: "js-objects-submit",
                            placeholder: "Submit",
                            theme: "primary",
                            dosubmit: true,
                        },
                    ]
                }
            ]
        },
        {
            headline: "Using dependent calendars",
            id: "dependent-calendars",
            style: "dashed",
            validation: {
                default: "You are missing a date"
            },
            events: true,
            containers: [
                {
                    fields: [
                        {
                            type: "date",
                            id: "dependent-calendars-start-date",
                            placeholder: "Start date",
                            hint: "From 5/5/1991 to the middle date value",
                            date: new Date(),
                            minDate: new Date(1991, 4, 5),
                            maxDateOf: "dependent-calendars-middle-date",
                            validation: {
                                required: "This field is required",
                            },
                            required: true
                        },
                        {
                            type: "date",
                            id: "dependent-calendars-middle-date",
                            placeholder: "Middle date",
                            hint: "Between the start date value, to the end date value",
                            date: moment().format("YYYY-MM-DD"),
                            minDateOf: "dependent-calendars-start-date",
                            maxDateOf: "dependent-calendars-end-date",
                            validation: {
                                required: "This field is required",
                            },
                            required: true
                        },
                        {
                            type: "date",
                            id: "dependent-calendars-end-date",
                            placeholder: "End date",
                            hint: "From the middle date value to 1/1/2035",
                            date: new Date(moment().format("YYYY-MM-DD")),
                            minDateOf: "dependent-calendars-middle-date",
                            maxDate: new Date(moment("2035-01-01").format("YYYY-MM-DD")),
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
                            type: "void",
                            id: null,
                        },
                        {
                            type: "void",
                            id: null,
                        },
                        {
                            type: "button",
                            id: "dependent-calendars-submit",
                            placeholder: "Submit",
                            theme: "primary",
                            dosubmit: true,
                        },
                    ]
                }
            ]
        },
    ]

    constructor(
        private _wizardEventBus: WizardEventBus
    ){
        this.subscription.add(this._wizardEventBus.subscribe("simple-strings", WizardEventTypes.SUBMIT, (event: IWizData) => {
            alert("Simple strings submitted!")
        }))

        this.subscription.add(this._wizardEventBus.subscribe("moment-objects", WizardEventTypes.SUBMIT, (event: IWizData) => {
            alert("Moment objects submitted!")
        }))

        this.subscription.add(this._wizardEventBus.subscribe("js-objects", WizardEventTypes.SUBMIT, (event: IWizData) => {
            alert("JS objects submitted!")
        }))

        this.subscription.add(this._wizardEventBus.subscribe("dependent-calendars", WizardEventTypes.SUBMIT, (event: IWizData) => {
            alert("Dependent calendars submitted!")
        }))
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
    
}


