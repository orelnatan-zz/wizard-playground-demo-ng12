import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of as observableOf, throwError } from 'rxjs'; 
import { map, catchError, delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IWizItem } from 'ngx-mat-form-wizard'; 

@Injectable()
export class LoremIpsum {
    ipsums: Array<IWizItem> = [];

    constructor(
		private _httpClient: HttpClient
    ){}

    public getIpsumsByKeyword(keyword: string): Observable<IWizItem[] | HttpErrorResponse> {
        return keyword ? this._httpClient.get(environment.apis.ipsums).pipe(delay(2200),
            map((response: { items: Array<IWizItem>}): Array<IWizItem> => {
            this.ipsums = response.items.filter((ipsum: IWizItem) => {
                return ipsum.name.toLowerCase().includes(keyword.toLowerCase());
            });

            return this.ipsums;
        }), catchError((error: HttpErrorResponse): Observable<HttpErrorResponse> => { 
            return throwError(error);  
        })) : observableOf(this.ipsums)
    }


}