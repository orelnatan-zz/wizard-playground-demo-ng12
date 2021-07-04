import { Component } from '@angular/core';
import { IWizData, IWizGroup, WizardEventBus, WizardEventTypes, } from 'ngx-mat-form-wizard';

@Component({
  selector: 'introduction-demo',
  templateUrl: './introduction-demo.page.html',
  styleUrls: ['./introduction-demo.page.scss']
})
export class IntroductionDemo {
    groups: Array<IWizGroup> = [
        {
            id: "group-number-one",
            headline: "This is a group header",
            containers: [
                {
                    id: null,
                    fields: [
                        {
                            type: "text",
                            id: "text-field",
                            placeholder: "Text",
                            events: true,
                            value: null,
                            minLength: 4,
                            maxLength: 16,
                            validation: "text must be 4-16 characters long",
                            hint: "this is a hint for this text field",
                            required: true
                        },
                        {
                            type: "email",
                            id: "email-field",
                            placeholder: "Email",
                            validation: "email is invalid",
                            hint: "this is a hint for this email field",
                            required: true
                        },
                        {
                            type: "number",
                            id: "number-field",
                            placeholder: "Number",
                            minNum: -150,
                            maxNum: 415,
                            validation: "number must be between -150 to 415 only!",
                            required: true
                        },
                    ] 
                },
                {
                    id: null,
                    fields: [
                        {
                            type: "password",
                            id: "password-field",
                            placeholder: "Password",
                            validation: "password must be lowercase or numbers only, and 8-12 characters long.",
                            pattern: "[a-z0-9 ]*",
                            minLength: 8,
                            maxLength: 12,
                            disabled: false,
                            required: true
                        },
                        {
                            type: "password",
                            id: "disabled-password-field",
                            value: "w75gh123",
                            placeholder: "Password",
                            validation: "password must be lowercase or numbers only, and 8-12 characters long.",
                            hint: "this is a disabled password field",
                            pattern: "[a-z0-9 ]*",
                            minLength: 8,
                            maxLength: 12,
                            disabled: true,
                            required: false
                        },
                        {
                            type: "void",
                            id: null
                        },
                    ]
                }
            ]
        },
        {
            id: "group-number-two",
            headline: "This is a group header",
            style: "dashed",
            color: "#05ADE6",
            containers: [
                {
                    id: "group-2-container-1",
                    fields: [
                        {
                            type: "textarea",
                            id: "textarea-field",
                            placeholder: "Text Area",
                            rows: 8,
                            maxLength: 55,
                            minLength: 20,
                            validation: "text must be 20 - 55 characters long",
                            hint: "this is a hint for this textarea field",
                            required: false,
                        }
                    ]
                }
            ]
        },
        {
            id: null,
            headline: "This is a group header",
            style: "dotted",
            color: "#FF8C00",
            containers: [
                {
                    id: null,
                    fields: [
                        {
                            type: "search",
                            id: "search-field",
                            placeholder: "Search",
                            validation: "use upper/lower case letters only(12 characters long)",
                            pattern: "[a-zA-Z ]*",
                            maxLength: 12, 
                            pending: false
                        },
                        {
                            type: "date",
                            id: "date-field",
                            placeholder: "Date",
                            required: true
                        },
                    ]
                }, 
                {
                    id: "group-3-container-2",
                    fields: [
                        {   
                            type: "files",
                            id: "files-field",                                     
                            validation: "Please provide 3-5 documents.",
                            hint: "Up to 5MB.",                                      
                            maxSize: 5000000,                                        
                            multiple: true,                                       
                            minSelects: 3,                                         
                            maxSelects: 5,                                          
                            accept: ".pdf, .word, .png, .jpg, .excel, .csv",        
                            events: true, 
                            required: true
                        },
                        {
                            type: "date",
                            id: "date-field22",
                            placeholder: "Date",
                            required: true
                        },
                    ]
                }
            ]
        },
        
    ]
    
}
