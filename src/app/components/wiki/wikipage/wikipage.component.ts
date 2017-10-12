import { Component, OnInit, Input, Inject, OnChanges } from '@angular/core';
import { Store } from '@ngrx/store'

@Component({
    selector: 'app-wikipage',
    templateUrl: './wikipage.component.html',
    styleUrls: ['./wikipage.component.css']
})
export class WikipageComponent implements OnInit {
    @Input() wikiPage;
    html;
    wikiData;

    constructor( @Inject('wikiservice') private wikiService
        , private store: Store<any>) {

    }

    ngOnInit() {
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
    ngOnChanges(changes) {
        if (changes.wikiPage.currentValue) {
            let _term = changes.wikiPage.currentValue;
            this.wikiService.search2(_term)
                .subscribe((e) => { this.html = e })
        }
    }

}
