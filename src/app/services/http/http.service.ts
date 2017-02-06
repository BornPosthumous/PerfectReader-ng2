import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx'
import { BehaviorSubject } from "rxjs/BehaviorSubject"
import { Subject } from "rxjs/Subject"

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/last';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/concatMap'
import 'rxjs/add/operator/concat'
import 'rxjs/add/operator/merge'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/reduce'
import 'rxjs/add/operator/scan'
import 'rxjs/add/operator/skip'

@Injectable()
export class HttpService {

    private api = 'http://localhost:8080/api/';
    private definitions = [];
    history = new BehaviorSubject([]);
    current = new Subject();

    constructor(private http: Http) {
        this.keepHistory()
    }
    getParagraphs() {
        return this.http.get(this.api + 'paragraphs')
            .map((res: Response) => res.json())
    }

    getDefinition(word) {
        this.http.get(`http://localhost:3030/api/hegels/word/${word}`)
            .map((res: Response) => res.json())
            ._do((data) => { this.history.next(data) })
            ._do((data) => { this.current.next(data); })
            .subscribe()
    }

    keepHistory() {
        this.history
            .skip(1)
            .scan((acc, cur) => { return [...acc, cur] }, [])
            .take(10)
            .subscribe()
    }
    getHistory() {
        console.log(this.history.getValue())
        return this.history.getValue()
    }

    getDef() {
        return this.current
    }
}
