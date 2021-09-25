import { FormGroup } from '@angular/forms';

export const countFilledValuesValidator = (formGroup: FormGroup, numberOfValues: number): boolean => {
    return Object.keys(formGroup.controls).map((key: string) => {
        const value: any = formGroup.controls[key].value;

        return value != null && value != "";
    }).filter(value => value).length == numberOfValues;
};