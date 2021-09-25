import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of as observableOf, throwError } from 'rxjs'; 
import { map, catchError, delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IWizItem } from 'ngx-mat-form-wizard'; 

@Injectable()
export class Employees {
    employees: Array<IWizItem> = [];

    constructor(
		private _httpClient: HttpClient
    ){}

    public getEmployeesByKeyword(keyword: string): Observable<IWizItem[] | HttpErrorResponse> {
        return keyword ? this._httpClient.get(environment.apis.employees).pipe(delay(2200),
            map((response: { items: Array<IWizItem>}): Array<IWizItem> => {
            this.employees = response.items.filter((ipsum: IWizItem) => {
                return ipsum.name.toLowerCase().includes(keyword.toLowerCase());
            });

            return this.employees;
        }), catchError((error: HttpErrorResponse): Observable<HttpErrorResponse> => { 
            return throwError(error);  
        })) : observableOf(this.employees)
    }


}