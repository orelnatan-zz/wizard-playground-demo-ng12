import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of as observableOf, throwError } from 'rxjs'; 
import { map, catchError, delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IWizItem } from 'ngx-mat-form-wizard'; 

@Injectable()
export class Globus {
    states: Array<IWizItem> = [];

    constructor(
		private _httpClient: HttpClient
    ){}

    public getStatesByKeyword(keyword: string): Observable<IWizItem[] | HttpErrorResponse> {
        return keyword ? this._httpClient.get(environment.apis.states).pipe(delay(2500),
            map((response: { items: Array<IWizItem>}): Array<IWizItem> => {   
            this.states = response.items.filter((state: IWizItem) => {
                return state.name.toLowerCase().includes(
                    keyword.toLowerCase());
            });

            return this.states;
        }), catchError((error: HttpErrorResponse): Observable<HttpErrorResponse> => { 
            return throwError(error);  
        })) : observableOf(this.states)
    }

    public getCitiesByStateName(state: string): Observable<IWizItem[] | HttpErrorResponse> {
        return this._httpClient.get(environment.apis.cities).pipe(delay(4000),
            map((response: { [key: string]: Array<IWizItem> }): Array<IWizItem> => {
                     
            return response[state];
        }), catchError((error: HttpErrorResponse): Observable<HttpErrorResponse> => { 
            return throwError(error);  
        }))
    }

}