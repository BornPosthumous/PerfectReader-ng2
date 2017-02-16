import { Component, Inject, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { Store } from '@ngrx/store'

@Component({
    selector: 'app-wiki',
    templateUrl: './wiki.component.html',
    styleUrls: ['./wiki.component.css']
})
export class WikiComponent {

    items: any;
    term$ = new Subject<string>();
    definition;

    constructor( @Inject('wikiservice') private wikiService,
        private store: Store<any>) {

        // TODO Not sure why the array checking is necessary
        this.definition = this.store.select('definitions')
            .map((e) => { if (Array.isArray(e)) { console.log(e); return e[e.length - 1] } })
            .map((e) => { if (e && e.word) { return e.word } })

        this.wikiService.search(this.term$.merge(this.definition))
            .subscribe(results => this.items = results)

    }

}

