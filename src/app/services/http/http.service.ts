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
import { ADD_PARAGRAPH, LOAD_BOOK } from '../../reducers/paragraphs.reducer'
import { NEW_BOOK, NEW_PARAGRAPH, CURRENT_PARAGRAPH } from '../../reducers/current.reducer'
import { INIT_BOOK_LIST } from '../../reducers/books.reducer'
import * as R from 'ramda'

@Injectable()
export class HttpService implements OnInit {

    private api = 'http://localhost:8080/api/';

    constructor(
        private http: Http,
        private store: Store<any>
    ) {
        this.getParagraphs().subscribe((x) => { })
        this.getBooks().subscribe((x) => { })
    }

    ngOnInit() {

    }

    getBooks() {
        let bodyString = JSON.stringify({ book_id: 8 })
        let headers = new Headers({ 'Content-Type': 'application/json' })
        let options = new RequestOptions({ headers: headers })

        return this.http.get(this.api + `texts`)
            .map((res) => R.sortBy(R.prop('id'))(res.json()))
            .map(payload => {
                this.store.dispatch({ type: INIT_BOOK_LIST, payload })
            })
    }

    getParagraphs(book_id = 22) {
        console.log("Called get paragraphs")
        let bodyString = JSON.stringify({ book_id });
        let headers = new Headers({ 'Content-Type': 'application/json' })
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api + `paragraphs/book`, bodyString, options)
            .map((res) => {
                let payload = R.sortBy(R.prop('id'))(res.json())
                return payload
            })
            .flatMap((item) => item)
            .reduce((acc: any, cur: any) =>
                ([...acc, { id: cur.id, text: cur.paragraph, pos: cur.pos }]), [])
            .map(payload => {
                console.log("payload", payload)
                this.store.dispatch({ type: LOAD_BOOK, payload })
                this.store.dispatch({ type: NEW_BOOK, payload: book_id })

                let cur = payload.filter((y) => { return y.pos == 0 })
                this.store.dispatch({ type: CURRENT_PARAGRAPH, payload: cur })
            })
    }

    changeParagraph(num) {
        this.store.dispatch({ type: NEW_PARAGRAPH, payload: num })
        this.store.select('paragraphs')
            .map((x: any) => {
                let cur = x.filter((y) => { return y.pos == num })
                this.store.dispatch({ type: CURRENT_PARAGRAPH, payload: cur })
            }).subscribe()
    }

    getParagraph() {
        return this.http.get(this.api + 'paragraphs')
            .map((res: Response) => res.json())
    }

    lookupWord(term) {
        let word = term.trim()
        this.http.get(`http://localhost:3030/api/hegels/word/${word}`)
            .map((res: Response) => res.json())
            .map((payload) => ({ type: ADD_DEF, payload }))
            .subscribe((a) => this.store.dispatch(a))
    }

    saveParagraph(text) {
        let bodyString = JSON.stringify(text);
        let headers = new Headers({ 'Content-Type': 'application/json' })
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api + `paragraphs/update`, bodyString, options)
            ._do((x) => { console.log(x) })
            .map((res: Response) => res.json())
    }

}
