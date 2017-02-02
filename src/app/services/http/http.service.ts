import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx'
import { Subject } from "rxjs/Subject"

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/concatMap'
import 'rxjs/add/operator/merge'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/reduce'



@Injectable()
export class HttpService {

    private api = 'http://localhost:8080/api/';

    constructor(private http: Http) {
        console.log("HTTP Service", this.http)
    }

    getParagraphs() {
        return this.http.get(this.api + 'paragraphs')
            .map((res: Response) => res.json())

    }
}
