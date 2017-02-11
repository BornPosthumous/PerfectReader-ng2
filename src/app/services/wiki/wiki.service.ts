import { Injectable } from '@angular/core';
import { URLSearchParams, Jsonp } from '@angular/http';
import 'rxjs/add/operator/delay';

@Injectable()
export class WikiService {

    constructor(private jsonp: Jsonp) {
        this.search2('term').subscribe();
    }

    search(term: string) {
        let search = new URLSearchParams();
        search.set('action', 'opensearch');
        search.set('search', term);
        search.set('format', 'json');

        return this.jsonp
            .get(
            'https://en.wikipedia.org/w/api.php?callback=JSONP_CALLBACK',
            { search })
            .map(response => response.json()[1]);
    }

    search2(term: string) {
        let search = new URLSearchParams();
        search.set('format', 'json');
        search.set('action', 'query');
        search.set('prop', 'extracts');
        // search.set('exintro', '&');
        // search.set('titles', term);
        search.set('titles', 'hello');
        search.set('rvprop', 'content');
        search.set('callback', 'JSONP_CALLBACK');

        return this.jsonp.get('https://en.wikipedia.org/w/api.php?', { search })
            .map(response => { console.log(response.json().query); return response })
    }
}
