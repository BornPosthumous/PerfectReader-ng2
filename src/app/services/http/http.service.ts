import {
    Injectable
} from '@angular/core';
import {
    Http,
    Response,
    Headers,
    RequestOptions
} from '@angular/http';
import {
    Observable
} from 'rxjs/Rx'
import {
    BehaviorSubject
} from "rxjs/BehaviorSubject"
import {
    ReplaySubject
} from "rxjs/ReplaySubject"
import {
    Subject
} from "rxjs/Subject"

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
import * as R from "ramda";

@Injectable()
export class HttpService {

    private api = 'http://localhost:8080/api/';
    private definitions = [];

    historyDef = [];
    historyDefinitions = [];

    history = new BehaviorSubject([]);
    current = new Subject();

    constructor(private http: Http) {
        this.keepHistory()
        this.getDefinitions(["hello", "goodbye", "farewell"]);
    }
    getParagraphs() {
        return this.http.get(this.api + 'paragraphs')
            .map((res: Response) => res.json())
    }

    getDefinition(word) {
        this.http.get(`http://localhost:3030/api/hegels/word/${word}`)
            .map((res: Response) => res.json())
            ._do((data) => {
                this.history.next(data)
            })
            ._do((data) => {
                this.current.next(data);
            })
            .subscribe()
    }

    getWord(word) {
        return this.http.get(`http://localhost:3030/api/hegels/word/${word}`)
            .map((res: Response) => { return res.json(); })
    }

    getDefinitions(words) {

        return Observable.from(words)
            .concatMap((w) => this.getWord(w))

        // var subscription = source.subscribe(
        //     (x) => this.historyDefinitions.push(x),
        //     (err) => console.log('Error: ' + err),
        //     () => console.log("done", this.historyDefinitions))

        // return source;
    }

    keepHistory() {
        this.historyDef = [];
        console.log("cleared history")
        let source = this.history
            .skip(1)
            .scan((acc, cur) => {
                return [...acc, cur]
            }, [])

        var subscription = source.subscribe(
            (x) => this.historyDef.push(x),
            (err) => console.log(err),
            () => console.log("completed"))

    }
    getHistory() {
        let defs = R.uniq(R.unnest(this.historyDef))

        return this.getDefinitions(defs.map((d) => d.word))
            .scan((acc, cur) => [...acc, cur], [])
    }

    getDef() {
        return this.current
    }
}
