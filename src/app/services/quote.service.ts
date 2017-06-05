import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';



@Injectable ()
export class QuoteService {
    private quoteApiUrl = 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1';

    constructor(private http: Http) {}

    getQuote(): Promise <any> { 

        return this.http.get(this.quoteApiUrl)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
    private handleError(error:any): Promise <any> {
        console.error('An error occoured in quote.service ', error);
        return Promise.reject(error.message || error );
    }

}