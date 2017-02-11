import { Component, Inject, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-wiki',
    templateUrl: './wiki.component.html',
    styleUrls: ['./wiki.component.css']
})
export class WikiComponent {

    items: Array<string>;
    term$ = new Subject<string>();

    constructor( @Inject('wikiservice') private wikiService) {
        this.term$
            .subscribe(term => this.search(term))
    }

    search(term: string) {
        this.wikiService.search(term)
            .subscribe(results => this.items = results);
    }

}

