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

    constructor(
        @Inject('wikiservice') private wikiService,
        private store: Store<any>
    ) {
        // this.isHidden = false;
        this.store.select('wiki').do((x) => { console.log("loggin", x) })
            .subscribe((x: any) => {
                console.log("XX", x.text)
                if (x && x.text) {
                    let textModel = x.text;
                    this.wikiData = textModel
                        .map((t) => ({
                            text: t.paragraphs
                                .map((p) => p.text)
                                .reduce((acc, val) => {
                                    return acc + ' ' + val;
                                })
                        }))

                }
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

