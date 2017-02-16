import { Injectable } from '@angular/core'
import { URLSearchParams, Jsonp } from '@angular/http'
import 'rxjs/add/operator/delay'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class WikiService {

    constructor(private jsonp: Jsonp) {
        this.search2('hello').subscribe();
    }

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
                console.log(response.json()[1]);
                return response.json()[1]
            });
    }

    search2(term: string) {
        let search = new URLSearchParams();
        search.set('format', 'json');
        search.set('action', 'parse');
        // search.set('prop', 'extracts');
        search.set('page', term);
        // search.set('exintro', '&');
        // search.set('titles', term);
        // search.set('titles', 'hello');
        // search.set('rvprop', 'content');

        search.set('callback', 'JSONP_CALLBACK');

        return this.jsonp.get('https://en.wikipedia.org/w/api.php?', { search })
            .map(response => { return response.json() })
            .map((page) => page ? page.parse.text['*'] : '')
    }
}
