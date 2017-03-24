import { Injectable } from '@angular/core'
import { URLSearchParams, Jsonp } from '@angular/http'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { WIKIDATA } from '../../reducers/wiki.reducer'
import 'rxjs/add/operator/delay'
var wtf_wikipedia = require("wtf_wikipedia")

@Injectable()
export class WikiService {

    constructor(
        private jsonp: Jsonp,
        private store: Store<any>
    ) { }

    search(terms: Observable<string>, debounceMs = 400) {
        return terms
            .debounceTime(400)
            .distinctUntilChanged()
            .switchMap(term => this.rawsearch(term))
    }

    rawsearch(term: string) {
        let search = new URLSearchParams();
        search.set('action', 'opensearch');
        search.set('search', term);
        search.set('format', 'json');

        return this.jsonp
            .get('https://en.wikipedia.org/w/api.php?callback=JSONP_CALLBACK',
            { search })
            .map(response => {
                return response.json()[1]
            });
    }

    search2(term: string) {
        let search = new URLSearchParams();
        search.set('format', 'json');
        search.set('action', 'parse');
        search.set('page', term);
        search.set('callback', 'JSONP_CALLBACK');

        // return this.jsonp.get('https://en.wikipedia.org/w/api.php?', { search })
        //     .map(response => { return response.json() })
        //     .map((page) => (page && page.parse) ? page.parse.text['*'] : '')
        return Observable.of('');
    }

    searchData(term: string) {
        console.log("Searchdata: WIKISERVICE ", term)
        let search = new URLSearchParams();
        search.set('format', 'json');
        search.set('action', 'parse');
        search.set('prop', 'wikitext');
        search.set('page', term);
        search.set('callback', 'JSONP_CALLBACK');

        return this.jsonp.get('https://en.wikipedia.org/w/api.php?', { search })
            .map(response => {
                return response.json()
            })
            .map((x) => {
                return wtf_wikipedia.parse(x.parse.wikitext['*'])
            })
            .map((x) => {
                let iter = x.text
                console.log("Iter", iter)
                if (iter && iter.entries) {
                    console.log("Is iterable? ",
                        this.isIterable(iter.entries))
                }
                this.store.dispatch({ type: WIKIDATA, payload: x })
                return x;
            })
    }
    isIterable(obj) {
        // checks for null and undefined
        if (obj == null) {
            return false;
        }
        return typeof obj[Symbol.iterator] === 'function';
    }
}
