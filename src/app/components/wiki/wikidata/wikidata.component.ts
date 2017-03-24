import { Component, Inject, OnInit, HostListener } from '@angular/core';
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
    selector: 'app-wikidata',
    templateUrl: './wikidata.component.html',
    styleUrls: ['./wikidata.component.css'],
})

export class WikidataComponent {

    wikiData: any;
    // term$ = new Subject<string>();
    // definition;
    // isHidden: boolean;

    constructor(
        @Inject('wikiservice') private wikiService,
        private store: Store<any>
    ) {

        // this.isHidden = false;

        // this.wikiService.search(this.term$.merge(this.definition))
        //     .subscribe(results => this.items = results)

        // this.wikiService.searchData("book")
        //     .do((x) => { console.log(x) })
        //     .subscribe()

        // this.wikiData = this.store.select('wiki').do((x) => { console.log("loggin", x) })

        this.store.select('wiki').do((x) => { console.log("loggin", x) })
            .subscribe((x) => {
                console.log("wikidata component", x);
                this.wikiData = x;
            });

    }

    // @HostListener('window:keydown', ['$event'])
    // keyboardInput(event: KeyboardEvent) {
    //     let key = event.key
    //     if (key == 'd') {
    //         this.isHidden = !this.isHidden;
    //     }
    // }

}

