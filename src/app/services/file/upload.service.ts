
import {
    Injectable,
    OnInit,
    Inject,
} from '@angular/core';
import {
    Http,
    Response,
    Headers,
    RequestOptions
} from '@angular/http';
import { Observable } from 'rxjs/Rx'
import { BehaviorSubject } from "rxjs/BehaviorSubject"
import { ReplaySubject } from "rxjs/ReplaySubject"
import { Subject } from "rxjs/Subject"

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/last'
import 'rxjs/add/operator/take'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/concatMap'
import 'rxjs/add/operator/concat'
import 'rxjs/add/operator/merge'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/reduce'
import 'rxjs/add/operator/scan'
import 'rxjs/add/operator/skip'
import 'rxjs/add/operator/scan'
import { Store } from '@ngrx/store';
import { ADD_DEF } from '../../reducers/definitions.reducer'
import * as R from 'ramda'


@Injectable()
export class UploadService {

    private api = 'http://localhost:8080/api/';

    constructor(private http: Http, private store: Store<any>) { }

    ngOnInit() { }

    // getBooks() {
    //     let bodyString = JSON.stringify({ book_id: 8 });
    //     let headers = new Headers({ 'Content-Type': 'application/json' })
    //     let options = new RequestOptions({ headers: headers });

    //     return this.http.post(this.api + `texts`, bodyString, options)
    //         .map((res) => R.sortBy(R.prop('id'))(res.json()))

    // }

    // getParagraphs() {
    //     let bodyString = JSON.stringify({ book_id: 8 });
    //     let headers = new Headers({ 'Content-Type': 'application/json' })
    //     let options = new RequestOptions({ headers: headers });

    //     return this.http.post(this.api + `paragraphs/book`, bodyString, options)
    //         .map((res) => R.sortBy(R.prop('id'))(res.json()))
    // }
    // getParagraph() {
    //     return this.http.get(this.api + 'paragraphs')
    //         .map((res: Response) => res.json())
    // }

    // lookupWord(term) {
    //     let word = term.trim()
    //     this.http.get(`http://localhost:3030/api/hegels/word/${word}`)
    //         .map((res: Response) => res.json())
    //         .map((payload) => ({ type: ADD_DEF, payload }))
    //         .subscribe((a) => this.store.dispatch(a))
    // }

    // saveParagraph(text) {
    //     console.log(text);
    //     let bodyString = JSON.stringify(text);
    //     let headers = new Headers({ 'Content-Type': 'application/json' })
    //     let options = new RequestOptions({ headers: headers });

    //     return this.http.post(this.api + `paragraphs/update`, bodyString, options)
    //         ._do((x) => { console.log(x) })
    //         .map((res: Response) => res.json())

    // }

}
